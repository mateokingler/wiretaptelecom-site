"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  CheckIcon,
  Loader2Icon,
  PhoneIcon,
  RadioTowerIcon,
  ServerIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  WaypointsIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { logoByName } from "@/components/logo-marquee";
import { cn } from "@/lib/utils";

const stepLabels = ["Trunk", "PBX", "Call"];

const pbxOptions = [
  { id: "3cx", name: "3CX", field: "SIP server" },
  { id: "freepbx", name: "FreePBX", field: "SIP Server Host" },
  { id: "yeastar", name: "Yeastar", field: "Hostname / IP" },
  { id: "asterisk", name: "Asterisk", field: "pjsip endpoint" },
] as const;

type PbxId = (typeof pbxOptions)[number]["id"];

const provisionSteps = [
  "Reserving call paths",
  "Issuing STIR/SHAKEN certificate",
  "Trunk active",
];

/** Each pass through the loop shows a different customer, PBX, and auth method. */
const scenarios = [
  {
    pbx: "3cx" as PbxId,
    auth: "ip" as const,
    trunk: "main-trunk",
    ip: "203.0.113.24",
    caller: "+14155550134",
    ext: "101",
    edge: "Ashburn",
  },
  {
    pbx: "freepbx" as PbxId,
    auth: "register" as const,
    trunk: "branch-02",
    ip: "198.51.100.7",
    caller: "+13125550188",
    ext: "204",
    edge: "Chicago",
  },
  {
    pbx: "yeastar" as PbxId,
    auth: "ip" as const,
    trunk: "clinic-sip",
    ip: "192.0.2.61",
    caller: "+16465550142",
    ext: "110",
    edge: "New York",
  },
  {
    pbx: "asterisk" as PbxId,
    auth: "register" as const,
    trunk: "acme-voice",
    ip: "203.0.113.90",
    caller: "+18775550101",
    ext: "300",
    edge: "Dallas",
  },
];

type Scenario = (typeof scenarios)[number];

const callLog = (scenario: Scenario, pbxName: string) => [
  `0.00s  INVITE from ${scenario.caller}`,
  `0.01s  Reached Wiretap edge · ${scenario.edge}`,
  "0.02s  STIR/SHAKEN attestation A verified",
  `0.03s  Matched trunk ${scenario.trunk}`,
  `0.04s  180 Ringing · Ext ${scenario.ext} on ${pbxName}`,
  "1.90s  200 OK · call connected",
];

const CANCELLED = Symbol("cancelled");

export function HeroDemo() {
  const container = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const [round, setRound] = useState(0);
  const [step, setStep] = useState(0);
  const [typedName, setTypedName] = useState("");
  const [typing, setTyping] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [pressed, setPressed] = useState<string | null>(null);
  const [provision, setProvision] = useState(-1);
  const [pbx, setPbx] = useState<PbxId | null>(null);
  const [hop, setHop] = useState(-1);
  const [connected, setConnected] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const scenario = scenarios[round % scenarios.length];
  const selected = pbxOptions.find((option) => option.id === pbx) ?? null;
  const pbxName = selected?.name ?? "your PBX";

  useEffect(() => {
    const node = container.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cancelled = false;
    const timeouts: number[] = [];

    const sleep = (ms: number) =>
      new Promise<void>((resolve, reject) => {
        timeouts.push(
          window.setTimeout(() => (cancelled ? reject(CANCELLED) : resolve()), ms)
        );
      });

    const press = async (key: string) => {
      setPressed(key);
      await sleep(260);
      setPressed(null);
    };

    const play = async () => {
      await sleep(0);

      // Reduced motion gets the finished call, no animation.
      if (reduced) {
        const still = scenarios[0];
        setStep(2);
        setTypedName(still.trunk);
        setShowAuth(true);
        setProvision(provisionSteps.length);
        setPbx(still.pbx);
        setHop(4);
        setConnected(true);
        setLog(callLog(still, "3CX"));
        return;
      }

      for (let pass = 0; ; pass += 1) {
        const current = scenarios[pass % scenarios.length];
        const currentPbx = pbxOptions.find((option) => option.id === current.pbx)!;

        setRound(pass);
        setStep(0);
        setTypedName("");
        setShowAuth(false);
        setProvision(-1);
        setPbx(null);
        setHop(-1);
        setConnected(false);
        setLog([]);

        await sleep(700);
        setTyping(true);
        for (let i = 1; i <= current.trunk.length; i += 1) {
          await sleep(55);
          setTypedName(current.trunk.slice(0, i));
        }
        setTyping(false);

        await sleep(450);
        setShowAuth(true);

        await sleep(750);
        await press("create");

        setProvision(0);
        await sleep(750);
        setProvision(1);
        await sleep(750);
        setProvision(2);
        await sleep(650);
        setProvision(provisionSteps.length);

        await sleep(700);
        setStep(1);

        await sleep(900);
        setPbx(current.pbx);

        await sleep(1600);
        await press("connect");
        setStep(2);

        await sleep(900);
        const lines = callLog(current, currentPbx.name);
        setHop(0);
        setLog([lines[0]]);
        for (let i = 1; i < 5; i += 1) {
          await sleep(750);
          setHop(i);
          setLog((prev) => [...prev, lines[i]]);
        }

        await sleep(800);
        setConnected(true);
        setLog((prev) => [...prev, lines[5]]);

        await sleep(3400);
      }
    };

    play().catch((error) => {
      if (error !== CANCELLED) throw error;
    });

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [inView]);

  const hops: { icon: LucideIcon; label: string; sub: string }[] = [
    { icon: SmartphoneIcon, label: "Caller", sub: "Mobile" },
    { icon: RadioTowerIcon, label: "PSTN", sub: "Inbound" },
    { icon: WaypointsIcon, label: "Wiretap", sub: "Our network" },
    { icon: ServerIcon, label: scenario.trunk, sub: scenario.auth === "ip" ? "IP auth" : "Registered" },
    { icon: PhoneIcon, label: pbxName, sub: `Ext ${scenario.ext}` },
  ];

  return (
    <div
      ref={container}
      className="relative w-full overflow-hidden rounded-3xl bg-white text-foreground shadow-2xl shadow-black/30 ring-1 ring-white/20"
    >
      <p className="sr-only">
        A looping demo: a Wiretap SIP trunk is created, pointed at a 3CX, FreePBX, Yeastar, or
        Asterisk PBX, and a mobile call routes through the Wiretap network to a desk extension.
      </p>

      <div aria-hidden="true">
        <div className="flex items-center gap-3 border-b border-border bg-muted/70 px-5 py-3">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-navy/15" />
            <span className="size-2.5 rounded-full bg-navy/15" />
            <span className="size-2.5 rounded-full bg-navy/15" />
          </span>
          <p className="font-mono text-[0.7rem] text-muted-foreground">
            portal.wiretaptelecom.com
          </p>
        </div>

        <ol className="flex items-center gap-1 border-b border-border px-4 py-3">
          {stepLabels.map((label, index) => {
            const done = index < step;
            const current = index === step;
            return (
              <li
                key={label}
                className={cn(
                  "flex flex-1 items-center gap-2 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors duration-300",
                  current ? "bg-navy text-white" : "text-muted-foreground",
                  !current && !done && "opacity-45"
                )}
              >
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full text-[0.65rem]",
                    current ? "bg-white/20" : done ? "bg-brand-blue text-white" : "bg-navy/10"
                  )}
                >
                  {done ? <CheckIcon className="size-3" /> : index + 1}
                </span>
                {label}
              </li>
            );
          })}
        </ol>

        {/* Height is pinned at desktop so the hero copy never shifts between steps. */}
        <div className="min-h-[20.5rem] p-5 lg:h-[26rem]">
          {step === 0 && (
            <div>
              <h3 className="text-sm font-semibold">Create a trunk</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Name it, pick how it authenticates, and it is live.
              </p>

              <div className="mt-4">
                <span className="text-[0.7rem] font-semibold text-muted-foreground">
                  Trunk name
                </span>
                <div className="mt-1.5 flex h-10 items-center rounded-xl border border-border bg-background px-3 font-mono text-sm">
                  {typedName}
                  {typing && (
                    <span className="ml-px inline-block h-4 w-px animate-pulse bg-brand-blue" />
                  )}
                </div>
              </div>

              <div
                className={cn(
                  "mt-4 transition-opacity duration-500",
                  showAuth ? "opacity-100" : "opacity-0"
                )}
              >
                <span className="text-[0.7rem] font-semibold text-muted-foreground">
                  Authentication
                </span>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  {(
                    [
                      { id: "ip", label: "IP address" },
                      { id: "register", label: "Registration" },
                    ] as const
                  ).map((option) => (
                    <div
                      key={option.id}
                      className={cn(
                        "rounded-xl border px-3 py-2 text-center text-sm font-medium transition-colors duration-300",
                        scenario.auth === option.id
                          ? "border-brand-blue bg-brand-blue/8 text-brand-blue"
                          : "border-border text-muted-foreground"
                      )}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>

                {scenario.auth === "ip" ? (
                  <div className="mt-4">
                    <span className="text-[0.7rem] font-semibold text-muted-foreground">
                      Your PBX public IP
                    </span>
                    <div className="mt-1.5 flex h-10 items-center rounded-xl border border-border bg-background px-3 font-mono text-sm">
                      {scenario.ip}
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 rounded-xl bg-muted px-3 py-2.5 text-xs text-muted-foreground">
                    Credentials are generated for you. Your PBX registers out, so no firewall
                    pinholes are needed.
                  </p>
                )}
              </div>

              {provision > -1 ? (
                <ul className="mt-4 space-y-1.5">
                  {provisionSteps.map((line, index) => (
                    <li
                      key={line}
                      className={cn(
                        "flex items-center gap-2 text-xs transition-opacity duration-300",
                        index <= provision ? "opacity-100" : "opacity-35"
                      )}
                    >
                      {index < provision ? (
                        <CheckIcon className="size-3.5 text-brand-blue" />
                      ) : index === provision ? (
                        <Loader2Icon className="size-3.5 animate-spin text-brand-blue" />
                      ) : (
                        <span className="size-3.5" />
                      )}
                      {line}
                    </li>
                  ))}
                </ul>
              ) : (
                <div
                  className={cn(
                    "mt-5 flex h-10 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white transition-transform duration-200",
                    pressed === "create" && "scale-[0.97] bg-navy-soft"
                  )}
                >
                  Create trunk
                </div>
              )}
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="text-sm font-semibold">Point it at your PBX</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Whatever you run, we show the values it wants.
              </p>

              <div className="mt-4 grid grid-cols-4 gap-2">
                {pbxOptions.map((option) => {
                  const logo = logoByName.get(option.name)!;
                  return (
                    <div
                      key={option.id}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-xl border px-2 py-3 transition-colors duration-300",
                        pbx === option.id
                          ? "border-brand-blue bg-brand-blue/8"
                          : "border-border opacity-55"
                      )}
                    >
                      <span className="flex h-7 w-full items-center justify-center">
                        <Image
                          src={logo.src}
                          alt=""
                          width={logo.width}
                          height={logo.height}
                          unoptimized={logo.src.endsWith(".svg")}
                          className="max-h-7 w-auto max-w-full object-contain"
                        />
                      </span>
                      <span className="text-[0.7rem] font-semibold">{option.name}</span>
                    </div>
                  );
                })}
              </div>

              <div
                className={cn(
                  "transition-opacity duration-500",
                  selected ? "opacity-100" : "opacity-0"
                )}
              >
                <dl className="mt-4 divide-y divide-border rounded-xl bg-muted px-3">
                  {[
                    [selected?.field ?? "SIP server", "sip.wiretaptelecom.com"],
                    ["Transport", "UDP · port 5060"],
                    [
                      "Authentication",
                      scenario.auth === "ip"
                        ? `IP · ${scenario.ip}`
                        : `Register · ${scenario.trunk}`,
                    ],
                    ["Codecs", "G.711 µ-law, G.729"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center gap-3 py-2">
                      <dt className="text-[0.7rem] font-semibold text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="ml-auto truncate font-mono text-[0.7rem]">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div
                  className={cn(
                    "mt-4 flex h-10 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white transition-transform duration-200",
                    pressed === "connect" && "scale-[0.97] bg-navy-soft"
                  )}
                >
                  Connect {pbxName}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-sm font-semibold">Place a call</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                A mobile dials in and traverses our network to {pbxName}.
              </p>

              <div className="relative mt-6">
                <div className="absolute left-[10%] right-[10%] top-[19px] h-0.5 bg-navy/10" />
                <div
                  className="absolute left-[10%] top-[19px] h-0.5 bg-brand-blue transition-[width] duration-500 ease-out"
                  style={{ width: `${Math.max(0, hop) * 20}%` }}
                />
                <ol className="relative grid grid-cols-5 gap-1">
                  {hops.map((node, index) => {
                    const Icon = node.icon;
                    const active = hop >= index;
                    const live = hop === index && !connected;
                    return (
                      <li key={node.label} className="flex flex-col items-center text-center">
                        <span
                          className={cn(
                            "flex size-10 items-center justify-center rounded-full ring-4 ring-white transition-colors duration-300",
                            active
                              ? "bg-brand-blue text-white"
                              : "bg-muted text-muted-foreground",
                            live && "animate-pulse"
                          )}
                        >
                          <Icon className="size-4.5" />
                        </span>
                        <span className="mt-2 w-full truncate text-[0.65rem] font-semibold leading-tight">
                          {node.label}
                        </span>
                        <span className="text-[0.6rem] leading-tight text-muted-foreground">
                          {node.sub}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className="mt-5 h-[6.5rem] overflow-hidden rounded-xl bg-navy px-3 py-2.5 font-mono text-[0.65rem] leading-[1.45] text-white/75">
                {log.length === 0 ? (
                  <p className="text-white/45">Dialing…</p>
                ) : (
                  log.slice(-6).map((line) => <p key={line}>{line}</p>)
                )}
              </div>

              <div
                className={cn(
                  "mt-4 flex h-10 items-center gap-2 rounded-xl px-3 text-xs font-semibold transition-colors duration-500",
                  connected
                    ? "bg-brand-blue/8 text-brand-blue"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {connected ? (
                  <>
                    <ShieldCheckIcon className="size-4" />
                    Connected · G.711 µ-law · MOS 4.4
                  </>
                ) : (
                  <>
                    <Loader2Icon className="size-4 animate-spin" />
                    Routing call…
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

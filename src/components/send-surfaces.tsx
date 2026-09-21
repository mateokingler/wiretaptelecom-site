"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckCheckIcon,
  ClockIcon,
  CornerUpLeftIcon,
  ImageIcon,
  type LucideIcon,
  MailIcon,
  MessageSquareIcon,
  RadioTowerIcon,
  SendIcon,
  SquareTerminalIcon,
  TabletSmartphoneIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FROM = "+1 816 555 0142";
const TO = "+1 954 555 1212";

type Surface = {
  id: string;
  tab: string;
  icon: LucideIcon;
  /** The path or window title shown in the mock's chrome bar. */
  chrome: string;
  fields: { label: string; value: string }[];
  body: string;
  /** JSON surfaces wrap the typed body in a payload instead of a plain bubble. */
  layout: "plain" | "json";
  kind: "SMS" | "MMS";
  action: string;
  /** How the reply comes back to this surface, and what the handset sends. */
  inbound?: { label: string; text: string };
  reply?: string;
};

const surfaces: Surface[] = [
  {
    id: "portal",
    tab: "Portal",
    icon: MessageSquareIcon,
    chrome: "portal.wiretaptelecom.com / core-sms",
    fields: [
      { label: "From", value: FROM },
      { label: "To", value: TO },
    ],
    body: "Your technician is 10 minutes out. Reply STOP to opt out.",
    layout: "plain",
    kind: "MMS",
    action: "Send message",
  },
  {
    id: "email",
    tab: "Email",
    icon: MailIcon,
    chrome: "New message",
    fields: [
      { label: "To", value: "19545551212@sms.wiretaptelecom.com" },
      { label: "From", value: "dispatch@acme-plumbing.com" },
    ],
    body: "Parts are in. We can fit you in at 2pm today.",
    layout: "plain",
    kind: "SMS",
    action: "Send",
    inbound: { label: "Inbox", text: "SMS from +1 954 555 1212" },
    reply: "2pm works. Thanks!",
  },
  {
    id: "api",
    tab: "API",
    icon: SquareTerminalIcon,
    chrome: "sms.wiretaptelecom.com / smsapis",
    fields: [
      { label: "Method", value: "POST" },
      { label: "Auth", value: "Bearer ••••••••••••" },
    ],
    body: "Invoice 4417 is ready to view.",
    layout: "json",
    kind: "SMS",
    action: "Send request",
    inbound: { label: "Webhook", text: "POST /inbound · 200 OK" },
    reply: "Paid, thanks.",
  },
  {
    id: "pbx",
    tab: "PBX",
    icon: TabletSmartphoneIcon,
    chrome: "3CX · Chats",
    fields: [
      { label: "Extension", value: "104 · Dispatch" },
      { label: "DID", value: FROM },
    ],
    body: "On our way. See you shortly.",
    layout: "plain",
    kind: "SMS",
    action: "Send",
    inbound: { label: "Chats", text: "New message · +1 954 555 1212" },
    reply: "Gate code is 4417.",
  },
];

type Stage = "typing" | "queued" | "accepted" | "delivered" | "replied";

const rail: { id: Stage; label: string; icon: LucideIcon }[] = [
  { id: "queued", label: "Queued", icon: ClockIcon },
  { id: "accepted", label: "Carrier accepted", icon: RadioTowerIcon },
  { id: "delivered", label: "Delivered", icon: CheckCheckIcon },
];

const order: Stage[] = ["typing", "queued", "accepted", "delivered", "replied"];

const CANCELLED = Symbol("cancelled");

export function SendSurfaces() {
  const container = useRef<HTMLDivElement>(null);
  // Set by the tab strip so the next loop starts on the surface you picked.
  const startAt = useRef(0);
  const [inView, setInView] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<Stage>("typing");
  const [typed, setTyped] = useState(0);
  const [stamp, setStamp] = useState("");

  const surface = surfaces[index];
  const reached = order.indexOf(stage);
  const sent = reached >= order.indexOf("queued");
  const delivered = reached >= order.indexOf("delivered");

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
    const timers: number[] = [];

    const sleep = (ms: number) =>
      new Promise<void>((resolve, reject) => {
        timers.push(
          window.setTimeout(() => (cancelled ? reject(CANCELLED) : resolve()), ms)
        );
      });

    const clock = () =>
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

    const play = async () => {
      await sleep(0);

      if (reduced) {
        // Land on the finished state so the point survives without motion.
        const target = surfaces[startAt.current];
        setIndex(startAt.current);
        setTyped(target.body.length);
        setStage(target.reply ? "replied" : "delivered");
        setStamp(clock());
        return;
      }

      let i = startAt.current;
      startAt.current = 0;

      for (;;) {
        const current = surfaces[i];
        setIndex(i);
        setStage("typing");
        setTyped(0);
        setStamp("");
        await sleep(500);

        for (let c = 1; c <= current.body.length; c += 1) {
          setTyped(c);
          await sleep(22);
        }
        await sleep(600);

        setStage("queued");
        await sleep(650);
        setStage("accepted");
        await sleep(850);
        setStage("delivered");
        setStamp(clock());
        await sleep(current.reply ? 1500 : 2400);

        if (current.reply) {
          setStage("replied");
          await sleep(2400);
        }

        i = (i + 1) % surfaces.length;
      }
    };

    play().catch((error) => {
      if (error !== CANCELLED) throw error;
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, trigger]);

  return (
    <div
      ref={container}
      className="overflow-hidden rounded-[1.75rem] bg-card ring-1 ring-navy/8"
    >
      <p className="sr-only">
        A looping demonstration of the four ways to send a message on one number: from
        the Wiretap portal, by emailing the Email2SMS gateway, through the REST API, or
        from a PBX chat window. Each message is queued, accepted by the carrier, and
        confirmed delivered, and replies come back to the same surface you sent from.
      </p>

      {/* The tab strip stays outside the aria-hidden mock below, where focusable
          controls would be unreachable to assistive tech. */}
      <div className="flex gap-1 overflow-x-auto border-b border-border bg-muted/60 px-3 py-2.5">
        {surfaces.map((item, itemIndex) => {
          const Icon = item.icon;
          const active = itemIndex === index;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                startAt.current = itemIndex;
                setTrigger((value) => value + 1);
              }}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue",
                active
                  ? "bg-navy text-white"
                  : "text-muted-foreground hover:bg-navy/8 hover:text-foreground"
              )}
            >
              <Icon aria-hidden="true" className="size-3.5" />
              {item.tab}
              <span className="sr-only"> — show this sending surface</span>
            </button>
          );
        })}
      </div>

      <div aria-hidden="true" className="p-5 sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_15rem] lg:gap-8">
          <div className="min-w-0">
            <div className="rounded-2xl border border-border">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                <span className="flex gap-1" aria-hidden="true">
                  {["bg-red-300", "bg-amber-300", "bg-emerald-300"].map((dot) => (
                    <span key={dot} className={cn("size-2 rounded-full", dot)} />
                  ))}
                </span>
                <span className="truncate font-mono text-[0.7rem] text-muted-foreground">
                  {surface.chrome}
                </span>
              </div>

              <div className="space-y-2.5 p-4">
                {surface.fields.map((field) => (
                  <div key={field.label} className="flex gap-3 text-xs">
                    <span className="w-16 shrink-0 text-muted-foreground">
                      {field.label}
                    </span>
                    <span className="truncate font-mono text-foreground">
                      {field.value}
                    </span>
                  </div>
                ))}

                <div className="min-h-20 rounded-xl bg-muted p-3.5">
                  {surface.layout === "json" ? (
                    <pre className="overflow-x-auto font-mono text-[0.7rem] leading-relaxed text-foreground">
                      {`{\n  "from": "+18165550142",\n  "to":   "+19545551212",\n  "body": "`}
                      <span className="text-brand-blue">
                        {surface.body.slice(0, typed)}
                      </span>
                      {`"\n}`}
                    </pre>
                  ) : (
                    <p className="text-sm leading-relaxed">
                      {surface.body.slice(0, typed)}
                      {!sent && (
                        <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-brand-blue align-middle motion-reduce:hidden" />
                      )}
                    </p>
                  )}

                  {surface.kind === "MMS" && (
                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-card px-2.5 py-1.5 text-[0.7rem] font-medium ring-1 ring-navy/8">
                      <ImageIcon className="size-3.5 text-brand-blue" />
                      before-and-after.jpg
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 pt-0.5">
                  <span className="rounded-full bg-tint-sky px-2.5 py-1 text-[0.7rem] font-semibold text-navy-soft">
                    {surface.kind}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-300",
                      sent ? "bg-navy/8 text-muted-foreground" : "bg-navy text-white"
                    )}
                  >
                    <SendIcon className="size-3.5" />
                    {sent ? "Sent" : surface.action}
                  </span>
                </div>
              </div>
            </div>

            {/* Rendered for the whole cycle on surfaces that get a reply, so the
                card does not resize underneath the reader when one arrives. */}
            {surface.inbound && (
              <div
                className={cn(
                  "mt-2.5 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs transition-opacity duration-500",
                  stage === "replied"
                    ? "bg-emerald-50 opacity-100 ring-1 ring-emerald-200"
                    : "bg-muted opacity-0"
                )}
              >
                <CornerUpLeftIcon className="size-3.5 shrink-0 text-emerald-700" />
                <span className="font-semibold text-emerald-900">
                  {surface.inbound.label}
                </span>
                <span className="truncate text-emerald-800">{surface.inbound.text}</span>
              </div>
            )}
          </div>

          <div className="mx-auto w-[15rem] shrink-0">
            <div className="rounded-[1.75rem] bg-navy p-2.5 shadow-xl shadow-navy/20">
              <div className="rounded-[1.4rem] bg-white p-3">
                <div className="flex items-center gap-2 border-b border-border pb-2.5">
                  <span className="flex size-7 items-center justify-center rounded-full bg-tint-sky text-[0.65rem] font-bold text-navy-soft">
                    WT
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-semibold">{FROM}</span>
                    <span className="block text-[0.6rem] text-muted-foreground">
                      Text message
                    </span>
                  </span>
                </div>

                <div className="min-h-44 space-y-2 pt-3">
                  <div
                    className={cn(
                      "transition-all duration-500",
                      delivered
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0"
                    )}
                  >
                    <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-muted px-3 py-2 text-xs leading-relaxed">
                      {surface.body}
                    </p>
                    {surface.kind === "MMS" && (
                      <span className="mt-1.5 flex h-16 max-w-[85%] items-center justify-center rounded-2xl rounded-bl-md bg-tint-sky">
                        <ImageIcon className="size-5 text-brand-blue" />
                      </span>
                    )}
                    <span className="mt-1 block text-[0.6rem] text-muted-foreground">
                      {stamp}
                    </span>
                  </div>

                  {surface.reply && (
                    <div
                      className={cn(
                        "flex justify-end transition-all duration-500",
                        stage === "replied"
                          ? "translate-y-0 opacity-100"
                          : "translate-y-2 opacity-0"
                      )}
                    >
                      <p className="max-w-[85%] rounded-2xl rounded-br-md bg-brand-blue px-3 py-2 text-xs leading-relaxed text-white">
                        {surface.reply}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
            {rail.map((step, stepIndex) => {
              const position = order.indexOf(step.id);
              // Delivery is terminal, so it settles green the moment it is
              // reached rather than waiting for a stage that may never come.
              const terminal = stepIndex === rail.length - 1;
              const done = reached > position || (terminal && reached === position);
              const active = !done && reached === position;
              const Icon = step.icon;
              return (
                <li key={step.id} className="flex items-center gap-2">
                  {stepIndex > 0 && (
                    <span
                      className={cn(
                        "hidden h-px w-5 transition-colors duration-500 sm:block",
                        done || active ? "bg-emerald-400" : "bg-border"
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-500",
                      done
                        ? "bg-emerald-100 text-emerald-800"
                        : active
                          ? "bg-amber-100 text-amber-900"
                          : "bg-navy/8 text-muted-foreground"
                    )}
                  >
                    <Icon className="size-3.5" />
                    {step.label}
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="flex items-center gap-2 rounded-xl bg-brand-blue/8 px-3.5 py-3 text-sm font-semibold text-navy-soft">
            {surface.kind === "MMS" ? "$0.0120 this MMS" : "$0.0080 this SMS"}
            <span className="font-normal text-muted-foreground">· replies free</span>
          </div>
        </div>
      </div>
    </div>
  );
}

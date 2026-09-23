/**
 * Announces a new website lead in Slack once Zoho has accepted it.
 *
 * The browser cannot post to the webhook itself without publishing the URL, so
 * the form calls this route and we relay. Zoho remains the system of record:
 * this is a notification that something is waiting in Approve Leads, and a
 * Slack outage must never cost us the lead or show the visitor an error.
 */
export const dynamic = "force-dynamic";

const CHANNEL = "sales_alerts";
const USERNAME = "sales_watchman";
const ICON = "telephone_receiver";

const TIMEOUT_MS = 5_000;
const MAX_TEXT = 200;
const WINDOW_MS = 10 * 60_000;
const MAX_CALLS = 5;

/**
 * Best effort only: per process, so it resets on deploy and does not hold
 * across instances. It exists to stop the route being used to fire arbitrary
 * messages into the channel, not as a precise quota.
 */
const calls = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();

  for (const [ip, times] of calls) {
    const fresh = times.filter((time) => now - time < WINDOW_MS);
    if (fresh.length === 0) calls.delete(ip);
    else calls.set(ip, fresh);
  }

  const mine = calls.get(key) ?? [];
  if (mine.length >= MAX_CALLS) return true;

  calls.set(key, [...mine, now]);
  return false;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

/**
 * Collapses whitespace and escapes the three characters Slack treats as markup,
 * so a submitted name cannot forge a link or extra lines in the alert.
 */
function clean(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_TEXT)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function POST(request: Request) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const firstName = clean(payload.firstName);
  const lastName = clean(payload.lastName);
  const company = clean(payload.company);
  const email = clean(payload.email);
  const phone = clean(payload.phone);
  const source = clean(payload.source);

  if (!lastName || !email) {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (rateLimited(clientKey(request))) {
    return Response.json({ ok: false }, { status: 429 });
  }

  const name = [firstName, lastName].filter(Boolean).join(" ");
  const lines = [
    "*New website lead — action required*",
    company ? `${name} · ${company}` : name,
    [email, phone].filter(Boolean).join(" · "),
    "Waiting for approval in Zoho under *Approve Leads*.",
  ];
  if (source) lines.splice(3, 0, `Submitted from ${source}`);

  const text = lines.filter(Boolean).join("\n");

  if (!webhookUrl) {
    // Mirrors the core-managed notifier: log rather than fail when Slack is
    // not configured, so local and preview builds still take leads.
    console.info("[lead-alert] Slack webhook not configured", { text });
    return Response.json({ ok: true, delivered: false });
  }

  try {
    const slack = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        channel: CHANNEL,
        username: USERNAME,
        icon_emoji: `:${ICON}:`,
        text,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });

    if (!slack.ok) {
      console.error("[lead-alert] Slack rejected the message", {
        status: slack.status,
      });
      return Response.json({ ok: true, delivered: false });
    }
  } catch (error) {
    console.error("[lead-alert] Slack notification failed", {
      error: error instanceof Error ? error.message : error,
    });
    return Response.json({ ok: true, delivered: false });
  }

  return Response.json({ ok: true, delivered: true });
}

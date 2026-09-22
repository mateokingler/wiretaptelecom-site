"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  code: string;
  /** Only `json` is tokenised; everything else renders plain. */
  language?: "json" | "text";
  /** Shown top-left, e.g. the shell or the file a sample belongs in. */
  label?: string;
  className?: string;
};

export function CodeBlock({ code, language = "text", label, className }: Props) {
  return (
    <div className={cn("overflow-hidden rounded-2xl bg-navy", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2">
        <span className="font-mono text-xs text-white/60">{label}</span>
        <CopyButton code={code} />
      </div>
      {/* Long lines scroll sideways, so the box has to be reachable by keyboard
          for anyone who cannot drag it. */}
      <pre
        tabIndex={0}
        role="group"
        aria-label={label ? `${label} sample` : "Code sample"}
        className="overflow-x-auto px-4 py-4 text-[0.8125rem] leading-relaxed focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white/60"
      >
        <code className="font-mono text-white/90">
          {language === "json" ? highlightJson(code) : code}
        </code>
      </pre>
    </div>
  );
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={() => {
        // Clipboard access is denied over plain http and in some embeds. The
        // sample is selectable either way, so a failure just does nothing.
        navigator.clipboard?.writeText(code).then(
          () => setCopied(true),
          () => {}
        );
      }}
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
    >
      {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/**
 * Enough of a JSON tokeniser for request and response bodies, which beats
 * pulling in a syntax highlighter for the four languages we show. Splits on
 * strings first so a brace inside a string is never mistaken for punctuation.
 *
 * Every colour below clears 4.5:1 against --navy.
 */
const JSON_TOKEN = /("(?:\\.|[^"\\])*"\s*:?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?)/g;

function highlightJson(code: string) {
  return code.split(JSON_TOKEN).map((part, index) => {
    if (!part) return null;

    if (part.startsWith('"')) {
      const isKey = part.trimEnd().endsWith(":");
      return (
        <span key={index} className={isKey ? "text-[#9ecbff]" : "text-[#a5e6a0]"}>
          {part}
        </span>
      );
    }

    if (/^(?:true|false|null|-?\d)/.test(part)) {
      return (
        <span key={index} className="text-[#ffd479]">
          {part}
        </span>
      );
    }

    return (
      <span key={index} className="text-white/55">
        {part}
      </span>
    );
  });
}

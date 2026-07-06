"use client";

import { useEffect, useState } from "react";

import { hero } from "@/lib/site-config";

type Segment = { text: string; className?: string };
type Line =
  | { type: "cmd"; segments: Segment[] }
  | { type: "out"; segments: Segment[] };

const LINES: Line[] = [
  { type: "cmd", segments: [{ text: "whoami" }] },
  { type: "out", segments: [{ text: "⇒ Saket Anand 👋", className: "text-head-soft" }] },
  { type: "cmd", segments: [{ text: "cat role.txt" }] },
  {
    type: "out",
    segments: [
      { text: "⇒ Android Developer · ", className: "text-brand-green" },
      { text: "3+ yrs", className: "text-brand-amber" },
    ],
  },
  { type: "cmd", segments: [{ text: "./say_hi" }] },
];

const CHAR_MS = 45;
const LINE_PAUSE_MS = 320;

function lineLength(line: Line) {
  return line.segments.reduce((n, s) => n + s.text.length, 0);
}

/** Renders a command line's segments truncated to `chars` typed characters. */
function TypedSegments({ segments, chars }: { segments: Segment[]; chars: number }) {
  return (
    <>
      {segments.map((seg, i) => {
        const offset = segments
          .slice(0, i)
          .reduce((n, s) => n + s.text.length, 0);
        const visible = seg.text.slice(0, Math.max(0, chars - offset));
        return (
          <span key={i} className={seg.className}>
            {visible}
          </span>
        );
      })}
    </>
  );
}

function Caret({ blinking }: { blinking: boolean }) {
  return (
    <span
      aria-hidden
      className={`ml-1 inline-block h-4 w-[9px] translate-y-[3px] bg-brand-green ${blinking ? "animate-blink" : ""}`}
    />
  );
}

/**
 * The hero terminal: types its lines sequentially on mount with a moving
 * block caret, then leaves the caret blinking on the last prompt.
 * Respects prefers-reduced-motion by revealing everything at once.
 */
export function TerminalWindow() {
  // Progress: lines before `line` are fully shown; `chars` typed on the current one.
  const [progress, setProgress] = useState({ line: 0, chars: 0 });
  const done = progress.line >= LINES.length;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let line = 0;
    let chars = 0;

    const tick = () => {
      const current = LINES[line];
      if (!current) return;
      if (current.type === "out") {
        // Output lines appear whole after a beat.
        line += 1;
        setProgress({ line, chars: 0 });
        timer = setTimeout(tick, LINE_PAUSE_MS);
        return;
      }
      if (chars < lineLength(current)) {
        chars += 1;
        setProgress({ line, chars });
        timer = setTimeout(tick, CHAR_MS);
      } else {
        line += 1;
        chars = 0;
        setProgress({ line, chars });
        timer = setTimeout(tick, LINE_PAUSE_MS);
      }
    };

    timer = setTimeout(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setProgress({ line: LINES.length, chars: 0 });
      } else {
        tick();
      }
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-[450px] overflow-hidden rounded-xl border border-[rgba(74,222,128,0.2)] bg-panel shadow-[6px_6px_0_rgba(167,139,250,0.25)]">
      <div className="flex items-center gap-[7px] border-b border-[rgba(74,222,128,0.12)] bg-panel-alt px-3.5 py-2.5">
        <span className="size-[11px] rounded-full bg-[#ff5f56]" />
        <span className="size-[11px] rounded-full bg-[#ffbd2e]" />
        <span className="size-[11px] rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-[11px] text-ink-mute">{hero.terminalTitle}</span>
      </div>
      <div className="min-h-[172px] px-[18px] py-4 text-[13px] leading-[1.95]">
        {LINES.map((lineDef, i) => {
          if (i > progress.line) return null;
          const isCurrent = i === progress.line;
          const isLast = i === LINES.length - 1;
          if (lineDef.type === "out") {
            // Output only appears once fully "printed".
            if (isCurrent) return null;
            return (
              <div key={i}>
                {lineDef.segments.map((seg, j) => (
                  <span key={j} className={seg.className}>
                    {seg.text}
                  </span>
                ))}
              </div>
            );
          }
          return (
            <div key={i} className={i > 0 ? "mt-1.5" : undefined}>
              <span className="text-brand-pink">$</span>{" "}
              {isCurrent ? (
                <TypedSegments segments={lineDef.segments} chars={progress.chars} />
              ) : (
                lineDef.segments.map((seg, j) => (
                  <span key={j} className={seg.className}>
                    {seg.text}
                  </span>
                ))
              )}
              {(isCurrent || (done && isLast)) && <Caret blinking={done} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

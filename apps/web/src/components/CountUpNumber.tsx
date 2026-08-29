"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DURATION = 2000;
// prefix + digits/commas (optional decimals) + suffix, e.g. "100,000,000+" / "2m+" / "$1,000+"
const NUM_RE = /^(\D*?)([\d,]+(?:\.\d+)?)(.*)$/;

export function CountUpNumber({ text }: { text: string }) {
  const m = NUM_RE.exec(text);
  const prefix = m?.[1] ?? "";
  const suffix = m?.[3] ?? "";
  const target = m ? Number(m[2].replace(/,/g, "")) : NaN;
  const decimals = m?.[2].split(".")[1]?.length ?? 0;
  const hasComma = !!m?.[2].includes(",");

  const format = useCallback((v: number) =>
    prefix +
    (hasComma
      ? v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : v.toFixed(decimals)) +
    suffix, [prefix, suffix, hasComma, decimals]);

  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(() => (Number.isFinite(target) ? format(0) : text));

  useEffect(() => {
    const el = ref.current;
    if (!el || !Number.isFinite(target) || target === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(format(target));
      return;
    }

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;

      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / DURATION);
        const eased = 1 - (1 - p) ** 3;
        setDisplay(format(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });

    io.observe(el);
    return () => io.disconnect();
  }, [target, format]);

  return <span ref={ref}>{display}</span>;
}

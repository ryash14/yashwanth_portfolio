"use client";
import { useEffect, useRef } from "react";

type CursorState = "default" | "ext" | "button" | "input" | "card";

const LABELS: Record<CursorState, string> = {
  default: "",
  ext:     "Open ↗",
  button:  "Click",
  input:   "Type",
  card:    "Explore",
};

export default function Cursor() {
  const arrowRef = useRef<SVGSVGElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const pos      = useRef({ x: -300, y: -300 });
  const glow     = useRef({ x: -300, y: -300 });
  const raf      = useRef<number | null>(null);
  const ready    = useRef(false);

  useEffect(() => {
    // Only activate on genuine desktop with fine pointer + hover capability
    const isDesktop =
      window.matchMedia("(pointer: fine) and (hover: hover)").matches &&
      window.innerWidth >= 769;
    if (!isDesktop) return;

    const arrow = arrowRef.current;
    const glEl  = glowRef.current;
    const label = labelRef.current;
    if (!arrow || !glEl || !label) return;

    arrow.style.opacity = "0";
    glEl.style.opacity  = "0";

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const showLabel = (text: string, x: number, y: number) => {
      label.textContent = text;
      if (text) {
        label.style.opacity   = "1";
        label.style.transform = `translate(${x + 20}px, ${y - 8}px) scale(1)`;
      } else {
        label.style.opacity   = "0";
        label.style.transform = `translate(${x + 20}px, ${y - 8}px) scale(0.85)`;
      }
    };

    const getState = (el: HTMLElement): CursorState => {
      const tag = el.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return "input";
      if (tag === "BUTTON") return "button";
      if (tag === "A" && (el as HTMLAnchorElement).target === "_blank") return "ext";
      if (tag === "A") return "button";
      if (el.closest("article") || el.dataset.hover === "card") return "card";
      return "button";
    };

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!ready.current) {
        glow.current = { x: e.clientX, y: e.clientY };
        arrow.style.opacity = "1";
        glEl.style.opacity  = "1";
        ready.current = true;
      }
      arrow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      if (label.style.opacity === "1") {
        label.style.transform = `translate(${e.clientX + 20}px, ${e.clientY - 8}px) scale(1)`;
      }
    };

    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const s  = getState(el);
      const text = LABELS[s];
      showLabel(text, pos.current.x, pos.current.y);
      arrow.style.filter = text
        ? "drop-shadow(0 0 8px rgba(137,196,174,0.7))"
        : "drop-shadow(0 0 4px rgba(137,196,174,0.4))";
    };

    const onLeave = () => {
      showLabel("", pos.current.x, pos.current.y);
      arrow.style.filter = "none";
    };

    const loop = () => {
      glow.current.x = lerp(glow.current.x, pos.current.x, 0.09);
      glow.current.y = lerp(glow.current.y, pos.current.y, 0.09);
      glEl.style.transform = `translate(${glow.current.x - 16}px, ${glow.current.y - 16}px)`;
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    const attach = () => {
      document
        .querySelectorAll("a, button, [data-hover], input, textarea, select, label, article")
        .forEach(el => {
          const h = el as HTMLElement;
          h.removeEventListener("mouseenter", onEnter);
          h.removeEventListener("mouseleave", onLeave);
          h.addEventListener("mouseenter", onEnter);
          h.addEventListener("mouseleave", onLeave);
        });
    };
    attach();

    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      obs.disconnect();
      document
        .querySelectorAll("a, button, [data-hover], input, textarea, select, label, article")
        .forEach(el => {
          const h = el as HTMLElement;
          h.removeEventListener("mouseenter", onEnter);
          h.removeEventListener("mouseleave", onLeave);
        });
    };
  }, []);

  return (
    <>
      {/* ── Figma-style arrow ── */}
      <svg
        ref={arrowRef}
        width="20" height="24"
        viewBox="0 0 20 24"
        fill="none"
        className="cursor-el"
        style={{
          position: "fixed",
          top: 0, left: 0,
          zIndex: 9999,
          pointerEvents: "none",
          willChange: "transform",
          filter: "none",
          transition: "filter 0.2s",
        }}
      >
        <path
          d="M3 1 L3 20 L7.5 15 L11.5 22.5 L14.5 21 L10.5 13.5 L17 13.5 Z"
          fill="var(--accent)"
          stroke="#080808"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      {/* ── Soft radial glow ── */}
      <div
        ref={glowRef}
        className="cursor-el"
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 32, height: 32,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--accent-glow-md) 0%, transparent 70%)",
          filter: "blur(6px)",
          zIndex: 9997,
          pointerEvents: "none",
          willChange: "transform",
        }}
      />

      {/* ── Context label pill ── */}
      <div
        ref={labelRef}
        className="cursor-el"
        style={{
          position: "fixed",
          top: 0, left: 0,
          zIndex: 9998,
          pointerEvents: "none",
          background: "var(--accent)",
          color: "var(--btn-primary-text)",
          fontSize: 9,
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "3px 9px",
          borderRadius: 99,
          whiteSpace: "nowrap",
          opacity: 0,
          transition: "opacity 0.18s, transform 0.12s cubic-bezier(0.22,1,0.36,1)",
          boxShadow: "0 2px 12px var(--accent-glow-md)",
        }}
      />

      <style>{`
        /* Hidden by default — only shown on real desktop with fine pointer */
        .cursor-el { display: none; }

        @media (pointer: fine) and (hover: hover) and (min-width: 769px) {
          .cursor-el { display: block; }
          *, *::before, *::after { cursor: none !important; }
        }
      `}</style>
    </>
  );
}

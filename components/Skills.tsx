"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/lib/data";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

function iconSrc(icon: string) {
  return icon.startsWith("/") ? icon : `${DEVICON}/${icon}.svg`;
}

// Flatten for marquee
const ALL_ITEMS = skills.flatMap(g => g.items);
const ROW_A = ALL_ITEMS.slice(0, Math.ceil(ALL_ITEMS.length / 2));
const ROW_B = [...ALL_ITEMS.slice(Math.ceil(ALL_ITEMS.length / 2))].reverse();

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

// ── Marquee row ──────────────────────────────────────────────────────
function Marquee({ items, reverse = false, duration = 55 }: {
  items: { name: string; icon: string; invert?: boolean }[];
  reverse?: boolean;
  duration?: number;
}) {
  const doubled = [...items, ...items, ...items];
  return (
    <div style={{
      overflow: "hidden",
      maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
    }}>
      <div
        className={reverse ? "marquee-track-rev" : "marquee-track"}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((item, i) => (
          <div key={`${item.name}-${i}`} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 8, padding: "0 clamp(18px,2.5vw,30px)", flexShrink: 0,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={iconSrc(item.icon)}
              alt={item.name}
              width={26}
              height={26}
              className={item.invert ? "icon-theme-invert" : undefined}
              style={{ opacity: 0.75 }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <span style={{
              fontSize: 8, color: "var(--text-3)",
              fontFamily: "var(--font-mono)", whiteSpace: "nowrap",
              letterSpacing: "0.12em", textTransform: "uppercase",
            }}>
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Interactive skill chip ────────────────────────────────────────────
function SkillChip({ item }: { item: { name: string; icon: string; invert?: boolean } }) {
  const [active, setActive] = useState(false);
  const [hov, setHov]       = useState(false);

  return (
    <button
      onClick={() => setActive(a => !a)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "6px 12px",
        borderRadius: 6,
        border: `1px solid ${active ? "var(--accent)" : hov ? "var(--border-2)" : "var(--border)"}`,
        background: active
          ? "var(--accent-dim)"
          : hov
          ? "var(--surface)"
          : "transparent",
        color: active ? "var(--accent)" : hov ? "var(--text)" : "var(--text-2)",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.04em",
        cursor: "pointer",
        transition: "all 0.2s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: active ? "0 0 12px var(--accent-glow)" : "none",
        outline: "none",
        flexShrink: 0,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iconSrc(item.icon)}
        alt={item.name}
        width={14}
        height={14}
        className={item.invert ? "icon-theme-invert" : undefined}
        style={{
          opacity: active ? 1 : hov ? 0.9 : 0.6,
          transition: "opacity 0.2s",
          filter: [
            active ? "brightness(1.2)" : "",
          ].filter(Boolean).join(" ") || undefined,
        }}
        onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
      />
      {item.name}
    </button>
  );
}

// ── Category section ──────────────────────────────────────────────────
function CategorySection({ group, delay }: {
  group: typeof skills[number];
  delay: number;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Category header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10, marginBottom: 16,
      }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 9,
          color: "var(--accent)", letterSpacing: "0.2em",
          textTransform: "uppercase", fontWeight: 600,
        }}>
          {group.category}
        </span>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 9,
          color: "var(--text-3)", letterSpacing: "0.1em",
        }}>
          {group.items.length}
        </span>
      </div>

      {/* Interactive chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {group.items.map(item => (
          <SkillChip key={item.name} item={item} />
        ))}
      </div>
    </motion.div>
  );
}

// ── Section ──────────────────────────────────────────────────────────
export default function Skills() {
  return (
    <section id="skills">
      <div className="h-rule" />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(80px,10vw,140px) clamp(24px,4vw,48px)" }}>

        {/* Header */}
        <Reveal>
          <div style={{
            display: "flex", alignItems: "baseline", justifyContent: "space-between",
            marginBottom: "clamp(48px, 6vw, 72px)", flexWrap: "wrap", gap: 16,
          }}>
            <div>
              <p className="label" style={{ marginBottom: 10 }}>04 — Skills</p>
              <p style={{
                fontSize: 12, color: "var(--text-3)", fontFamily: "var(--font-mono)",
                letterSpacing: "0.04em",
              }}>
                What I reach for when building.
              </p>
            </div>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 9,
              color: "var(--text-3)", letterSpacing: "0.14em",
            }}>
              {ALL_ITEMS.length}+ technologies · click to highlight
            </span>
          </div>
        </Reveal>

        {/* ── Marquee band — borderless ── */}
        <Reveal>
          <div style={{ marginBottom: "clamp(48px, 7vw, 80px)" }}>
            <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
              <div style={{ padding: "20px 0", borderBottom: "1px solid var(--border)" }}>
                <Marquee items={ROW_A} duration={52} />
              </div>
              <div style={{ padding: "20px 0" }}>
                <Marquee items={ROW_B} reverse duration={65} />
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Category grid ── */}
        <div className="skills-cat-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "clamp(32px, 5vw, 56px) clamp(40px, 6vw, 72px)",
        }}>
          {skills.map((group, gi) => (
            <CategorySection key={group.category} group={group} delay={gi * 0.08} />
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .skills-cat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

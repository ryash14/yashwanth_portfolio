"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "@/lib/data";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

// ── Company logo badge ────────────────────────────────────────────────
function LogoBadge({ logo, company }: { logo: string | null; company: string }) {
  const initials = company
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0])
    .join("")
    .toUpperCase();

  return (
    <div style={{
      width: 44, height: 44,
      borderRadius: 10,
      border: "1px solid var(--border-2)",
      background: "var(--bg)",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      flexShrink: 0,
    }}>
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt={company} width={30} height={30} style={{ objectFit: "contain" }} />
      ) : (
        <span style={{
          fontFamily: "var(--font-grotesk)", fontWeight: 800,
          fontSize: 13, letterSpacing: "-0.04em",
          color: "var(--text-2)",
        }}>
          {initials}
        </span>
      )}
    </div>
  );
}

// ── Experience card with timeline dot ─────────────────────────────────
function ExperienceCard({
  exp, index, delay, isLast,
}: {
  exp: typeof experience[number];
  index: number;
  delay: number;
  isLast: boolean;
}) {
  const [hov, setHov] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    // Outer wrapper includes the timeline dot + connecting line
    <div style={{ display: "flex", gap: "clamp(20px, 3vw, 36px)", alignItems: "stretch" }}>

      {/* ── Timeline column ── */}
      <div className="exp-timeline-col" style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        flexShrink: 0,
        width: 24,
        paddingTop: 28,
      }}>
        {/* Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: delay + 0.15 }}
          style={{
            width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
            background: hov ? "var(--accent)" : "var(--border-2)",
            border: `2px solid ${hov ? "var(--accent)" : "var(--border-2)"}`,
            boxShadow: hov ? "0 0 10px var(--accent-glow-md)" : "none",
            transition: "background 0.3s, box-shadow 0.3s",
            zIndex: 1,
          }}
        />
        {/* Connecting line to next */}
        {!isLast && (
          <div style={{
            flex: 1, width: 2,
            background: "linear-gradient(to bottom, var(--border-2), transparent)",
            marginTop: 8,
            minHeight: 32,
          }} />
        )}
      </div>

      {/* ── Card ── */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          flex: 1,
          position: "relative",
          border: `1px solid ${hov ? "var(--border-2)" : "var(--border)"}`,
          borderRadius: 14,
          padding: "clamp(24px, 3.5vw, 36px)",
          background: hov ? "var(--surface)" : "var(--bg)",
          transform: hov ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hov ? "0 20px 44px rgba(0,0,0,0.4)" : "none",
          transition: "border-color 0.3s, background 0.3s, transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s",
          cursor: "default", overflow: "hidden",
          marginBottom: isLast ? 0 : "clamp(12px, 2vw, 20px)",
        }}
      >
        {/* Accent left glow */}
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0, width: 3,
          background: "linear-gradient(to bottom, var(--accent), transparent)",
          opacity: hov ? 0.65 : 0,
          transition: "opacity 0.3s",
          borderRadius: "14px 0 0 14px",
        }} />

        {/* Faint decorative index */}
        <span style={{
          position: "absolute", right: -4, top: -14,
          fontFamily: "var(--font-grotesk)", fontWeight: 800,
          fontSize: "clamp(80px, 10vw, 110px)", lineHeight: 1,
          letterSpacing: "-0.06em",
          color: "var(--text)", pointerEvents: "none",
          opacity: hov ? 0.035 : 0.018, transition: "opacity 0.4s",
          userSelect: "none",
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* ── Header: logo + company + period + type ── */}
        <div style={{
          display: "flex", alignItems: "flex-start",
          justifyContent: "space-between", gap: 12,
          marginBottom: 20,
          flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
            <LogoBadge logo={exp.logo} company={exp.company} />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                <span style={{
                  fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: 14,
                  color: "var(--text)", letterSpacing: "-0.02em",
                }}>
                  {exp.company}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 8,
                  padding: "2px 8px", borderRadius: 99,
                  border: "1px solid var(--border-2)",
                  color: "var(--text-3)", letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}>
                  {exp.type}
                </span>
              </div>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                color: "var(--accent)", letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}>
                {exp.period}
              </span>
            </div>
          </div>

          {/* Index badge */}
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 9,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "var(--text-3)", border: "1px solid var(--border)",
            padding: "3px 8px", borderRadius: 3, flexShrink: 0,
          }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: "var(--border)", marginBottom: 20 }} />

        {/* ── Role ── */}
        <h3 style={{
          fontFamily: "var(--font-grotesk)", fontWeight: 700,
          fontSize: "clamp(1.25rem, 2.4vw, 2rem)",
          letterSpacing: "-0.04em", lineHeight: 1.1,
          color: "var(--text)",
          margin: "0 0 clamp(16px, 2.5vh, 24px)",
          paddingRight: "clamp(0px, 8vw, 180px)",
        }}>
          {exp.role}
        </h3>

        {/* ── Content: desc + highlights + stack | metric ── */}
        <div className="exp-body-grid" style={{
          display: "grid",
          gridTemplateColumns: (exp as { metric?: string }).metric ? "1fr 148px" : "1fr",
          gap: "clamp(18px, 3.5vw, 44px)",
          alignItems: "start",
        }}>
          <div>
            {/* Short intro sentence */}
            <p style={{
              fontSize: "clamp(12px, 1vw, 13px)",
              lineHeight: 1.7, color: "var(--text-3)",
              marginBottom: 14, maxWidth: 640,
              fontStyle: "italic",
            }}>
              {exp.description}
            </p>

            {/* Highlight bullets */}
            {"highlights" in exp && Array.isArray((exp as { highlights?: string[] }).highlights) &&
              (exp as { highlights: string[] }).highlights.length > 0 && (
              <ul style={{ marginBottom: 18, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {(exp as { highlights: string[] }).highlights.map((item, hi) => (
                  <li key={hi} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span style={{
                      color: "var(--accent)", fontFamily: "var(--font-mono)",
                      fontSize: 10, flexShrink: 0, lineHeight: 1.7,
                    }}>→</span>
                    <span style={{
                      fontSize: "clamp(12.5px, 1vw, 13.5px)",
                      color: "var(--text-2)", lineHeight: 1.65,
                    }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {exp.stack.map(s => (
                <span key={s} style={{
                  fontSize: 9, padding: "3px 9px", borderRadius: 3,
                  border: `1px solid ${hov ? "var(--border-2)" : "var(--border)"}`,
                  color: "var(--text-2)", fontFamily: "var(--font-mono)",
                  letterSpacing: "0.04em", transition: "border-color 0.3s",
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {(exp as { metric?: string; metricLabel?: string }).metric && (
            <div style={{
              border: "1px solid var(--accent-border)",
              borderRadius: 10, padding: "20px 16px",
              background: "var(--accent-bg)",
              textAlign: "center", flexShrink: 0,
            }}>
              <p style={{
                fontFamily: "var(--font-grotesk)", fontWeight: 800,
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                letterSpacing: "-0.05em", lineHeight: 1,
                color: "var(--accent)", marginBottom: 8,
              }}>
                {(exp as { metric?: string }).metric}
              </p>
              <p style={{
                fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase",
                color: "var(--text-3)", fontFamily: "var(--font-mono)", lineHeight: 1.5,
              }}>
                {(exp as { metricLabel?: string }).metricLabel}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────
export default function Experience() {
  return (
    <section id="experience">
      <div className="h-rule" />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(80px,10vw,140px) clamp(24px,4vw,48px)" }}>

        <Reveal>
          <div style={{
            display: "flex", alignItems: "baseline", justifyContent: "space-between",
            flexWrap: "wrap", gap: 16,
            marginBottom: "clamp(48px, 6vw, 72px)",
          }}>
            <div>
              <p className="label" style={{ marginBottom: 10 }}>02 — Experience</p>
              <p style={{
                fontSize: 12, color: "var(--text-3)", fontFamily: "var(--font-mono)",
                letterSpacing: "0.04em",
              }}>
                Where I&apos;ve worked and what I&apos;ve shipped.
              </p>
            </div>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 9,
              color: "var(--text-3)", letterSpacing: "0.14em",
            }}>
              {experience.length} roles
            </span>
          </div>
        </Reveal>

        {/* Timeline list */}
        <div>
          {experience.map((exp, i) => (
            <ExperienceCard
              key={exp.company}
              exp={exp}
              index={i}
              delay={i * 0.07}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .exp-body-grid { grid-template-columns: 1fr !important; }
          .exp-timeline-col { display: none !important; }
        }
      `}</style>
    </section>
  );
}

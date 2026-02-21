"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { educationHistory } from "@/lib/data";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

// ── Academic record row ───────────────────────────────────────────────
function EduRow({
  edu, index, delay, isLast,
}: {
  edu: typeof educationHistory[number];
  index: number;
  delay: number;
  isLast: boolean;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className="edu-row"
      style={{
        display: "grid",
        gridTemplateColumns: "110px 1fr auto",
        gap: "clamp(20px, 3vw, 40px)",
        alignItems: "start",
        padding: "clamp(20px, 3vh, 28px) 0",
        borderBottom: isLast ? "1px solid var(--border)" : "1px solid var(--border)",
      }}
    >
      {/* Period column */}
      <div style={{ paddingTop: 3 }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 9,
          color: "var(--text-3)", letterSpacing: "0.1em",
          textTransform: "uppercase", lineHeight: 1.6,
          display: "block",
        }}>
          {edu.period}
        </span>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 9,
          color: "var(--text-3)", letterSpacing: "0.08em",
          display: "block", marginTop: 4,
          opacity: 0.5,
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Details column */}
      <div>
        <p style={{
          fontFamily: "var(--font-grotesk)", fontWeight: 700,
          fontSize: "clamp(1rem, 1.6vw, 1.3rem)",
          letterSpacing: "-0.025em", lineHeight: 1.2,
          color: "var(--text)", marginBottom: 10,
        }}>
          {edu.level}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: edu.coursework.length > 0 ? 14 : 0 }}>
          {edu.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={edu.logo}
              alt={edu.school}
              width={32}
              height={32}
              style={{
                borderRadius: 6, objectFit: "contain",
                background: "#fff",
                padding: 3,
                border: "1px solid var(--border-2)",
                flexShrink: 0,
                display: "block",
              }}
            />
          )}
          <p style={{
            fontSize: 12, color: "var(--text-3)",
            fontFamily: "var(--font-mono)", letterSpacing: "0.04em",
          }}>
            {edu.school}
          </p>
        </div>
        {edu.coursework.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {edu.coursework.map(c => (
              <span key={c} style={{
                fontSize: 9, padding: "2px 8px", borderRadius: 3,
                border: "1px solid var(--border-2)",
                color: "var(--text-3)", fontFamily: "var(--font-mono)",
                letterSpacing: "0.04em",
              }}>
                {c}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Score column */}
      <div style={{ textAlign: "right", paddingTop: 2 }}>
        <p style={{
          fontFamily: "var(--font-grotesk)", fontWeight: 800,
          fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
          letterSpacing: "-0.05em", lineHeight: 1,
          color: "var(--text)", marginBottom: 5,
        }}>
          {edu.score}
        </p>
        <p style={{
          fontSize: 8, letterSpacing: "0.12em", textTransform: "uppercase",
          color: "var(--text-3)", fontFamily: "var(--font-mono)",
        }}>
          {edu.scoreLabel}
        </p>
      </div>
    </motion.div>
  );
}

// ── Section ────────────────────────────────────────────────────────────
export default function EducationSection() {
  return (
    <section id="education">
      <div className="h-rule" />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(80px,10vw,140px) clamp(24px,4vw,48px)" }}>

        <Reveal>
          <p className="label" style={{ marginBottom: 10 }}>05 — Education</p>
          <p style={{
            fontSize: 12, color: "var(--text-3)", fontFamily: "var(--font-mono)",
            letterSpacing: "0.04em", marginBottom: "clamp(40px,5vw,60px)",
          }}>
            Academic background and key coursework.
          </p>
        </Reveal>

        {/* ── Academic record ── */}
        <Reveal delay={0.04}>
          <div>
            {/* Table header */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "110px 1fr auto",
              gap: "clamp(20px, 3vw, 40px)",
              padding: "0 0 10px",
              borderBottom: "1px solid var(--border-2)",
              marginBottom: 0,
            }}
              className="edu-row">
              {["Period", "Qualification", "Score"].map(h => (
                <p key={h} style={{
                  fontFamily: "var(--font-mono)", fontSize: 8,
                  color: "var(--text-3)", letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  textAlign: h === "Score" ? "right" : "left",
                }}>
                  {h}
                </p>
              ))}
            </div>

            {educationHistory.map((edu, i) => (
              <EduRow
                key={edu.level}
                edu={edu}
                index={i}
                delay={i * 0.06}
                isLast={i === educationHistory.length - 1}
              />
            ))}
          </div>
        </Reveal>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .edu-row  { grid-template-columns: 1fr auto !important; }
          .edu-row > :first-child { display: none; }
        }
      `}</style>
    </section>
  );
}

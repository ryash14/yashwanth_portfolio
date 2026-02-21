"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { educationHistory, certifications } from "@/lib/data";

// ── Animated card wrapper ──────────────────────────────────────────────
function BentoCard({
  children,
  delay = 0,
  highlight = false,
  hero = false,
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  highlight?: boolean;
  hero?: boolean;
  style?: React.CSSProperties;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderRadius: hero ? 18 : 14,
        border: highlight || hero
          ? "1px solid rgba(137,196,174,0.35)"
          : "1px solid var(--border)",
        padding: hero ? "28px 30px" : "20px 22px",
        background: hero
          ? "linear-gradient(135deg, rgba(137,196,174,0.09) 0%, rgba(137,196,174,0.03) 60%, transparent 100%)"
          : highlight
          ? "linear-gradient(135deg, rgba(137,196,174,0.07) 0%, transparent 80%)"
          : "var(--surface)",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.25s, transform 0.3s ease, box-shadow 0.3s ease",
        ...style,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = hero ? "rgba(137,196,174,0.6)" : "rgba(137,196,174,0.4)";
        el.style.transform   = "translateY(-3px)";
        el.style.boxShadow   = hero
          ? "0 20px 50px rgba(0,0,0,0.55), 0 0 40px rgba(137,196,174,0.08)"
          : "0 10px 30px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = highlight || hero ? "rgba(137,196,174,0.35)" : "var(--border)";
        el.style.transform   = "translateY(0)";
        el.style.boxShadow   = "none";
      }}
    >
      {children}
    </motion.div>
  );
}

// ── Place badge icon ─────────────────────────────────────────────────
function PlaceBadge({ place, scope }: { place: 1 | 2; scope: "National" | "Regional" | "Internal" }) {
  const color = place === 1 ? "#F59E0B" : "#9CA3AF";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      <svg width={13} height={13} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" fill={color} opacity={0.2} />
        <circle cx="12" cy="12" r="9" fill={color} opacity={0.85} />
        <text x="12" y="16.5" textAnchor="middle" fontSize="9" fontWeight="900"
          fontFamily="system-ui, sans-serif" fill="#1a1a1a" stroke="none">
          {place}
        </text>
      </svg>
      <span>{scope}</span>
    </span>
  );
}

function TrophyIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4a2 2 0 01-2-2V5h4" />
      <path d="M18 9h2a2 2 0 002-2V5h-4" />
      <path d="M12 17v4" />
      <path d="M8 21h8" />
      <path d="M6 3h12v10a6 6 0 01-12 0V3z" />
    </svg>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: "var(--font-mono)", fontSize: 8,
      letterSpacing: "0.16em", textTransform: "uppercase",
      color: "var(--text-3)", display: "block", marginBottom: 10,
    }}>
      {children}
    </span>
  );
}

function BigStat({ value, accent = false }: { value: string; accent?: boolean }) {
  return (
    <p style={{
      fontFamily: "var(--font-grotesk)", fontWeight: 900,
      fontSize: "clamp(2rem, 4vw, 3rem)",
      letterSpacing: "-0.06em", lineHeight: 1,
      color: accent ? "var(--accent)" : "var(--text)",
      margin: "0 0 8px",
    }}>
      {value}
    </p>
  );
}

function SmallStat({ value, accent = false }: { value: string; accent?: boolean }) {
  return (
    <p style={{
      fontFamily: "var(--font-grotesk)", fontWeight: 800,
      fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
      letterSpacing: "-0.05em", lineHeight: 1,
      color: accent ? "var(--accent)" : "var(--text)",
      margin: "0 0 7px",
    }}>
      {value}
    </p>
  );
}

// ── Decorative glow orb ────────────────────────────────────────────────
function GlowOrb({ top, right, size = 120 }: { top: number; right: number; size?: number }) {
  return (
    <div style={{
      position: "absolute", top, right,
      width: size, height: size, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(137,196,174,0.18) 0%, transparent 70%)",
      pointerEvents: "none",
    }} />
  );
}

// ── Section ────────────────────────────────────────────────────────────
export default function BentoHighlights() {
  return (
    <section id="highlights">
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "0 clamp(16px,4vw,48px) clamp(36px,6vw,72px)",
      }}>

        {/* ── Asymmetric bento grid ── */}
        <div className="bento-root" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(8px, 1vw, 12px)",
        }}>

          {/* ══ Row 1: Hero (2 cols) + ISRO (1 col) ══ */}

          {/* 1. HackSavvy — hero featured card, spans 2 columns */}
          <BentoCard hero delay={0.04} style={{ gridColumn: "span 2" }}>
            <GlowOrb top={-40} right={-40} size={180} />
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 8,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: "var(--text-3)",
                  }}>
                    National Champion
                  </span>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 8,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "var(--accent)",
                    background: "rgba(137,196,174,0.12)",
                    border: "1px solid rgba(137,196,174,0.25)",
                    padding: "2px 7px", borderRadius: 99,
                  }}>
                    HackSavvy 2025
                  </span>
                </div>
                <BigStat value="1st Place" accent />
                <p style={{ fontSize: 12.5, color: "var(--text-2)", lineHeight: 1.65, maxWidth: 360 }}>
                  Led a team of 4 to build{" "}
                  <strong style={{ color: "var(--text)", fontWeight: 600 }}>UrbanFlow AI</strong>{" "}
                  — real-time traffic management with adaptive signals and violation detection. Won at national level.
                </p>
              </div>
              {/* Decorative large number */}
              <div style={{
                fontFamily: "var(--font-grotesk)", fontWeight: 900,
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
                letterSpacing: "-0.08em", lineHeight: 1,
                color: "rgba(137,196,174,0.12)",
                userSelect: "none", flexShrink: 0,
                marginTop: -6,
              }}>
                #1
              </div>
            </div>
            {/* Bottom row: stack tags */}
            <div style={{ display: "flex", gap: 5, marginTop: 16, flexWrap: "wrap" }}>
              {["YOLOv8", "ResNet", "Flask", "Computer Vision"].map(t => (
                <span key={t} style={{
                  fontFamily: "var(--font-mono)", fontSize: 8.5,
                  color: "var(--text-3)", background: "rgba(137,196,174,0.07)",
                  border: "1px solid rgba(137,196,174,0.18)",
                  padding: "3px 9px", borderRadius: 99,
                  letterSpacing: "0.04em",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* 2. ISRO Internship */}
          <BentoCard delay={0.08}>
            <Tag>Research Internship</Tag>
            <SmallStat value="ISRO" />
            <p style={{ fontSize: 11.5, color: "var(--text-2)", lineHeight: 1.65 }}>
              NRSC internship — ML-based gap-filling for{" "}
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>TROPOMI</strong>{" "}
              satellite data (NO₂, SO₂, PM2.5) across India 2019–2024.
            </p>
            {/* Subtle decorative satellite shape */}
            <div style={{
              position: "absolute", bottom: 12, right: 16,
              fontFamily: "var(--font-mono)", fontSize: 22,
              color: "rgba(137,196,174,0.1)", userSelect: "none",
              fontWeight: 900,
            }}>
              ◈
            </div>
          </BentoCard>

          {/* ══ Row 2: Encode · LeetCode · Academic ══ */}

          {/* 3. Encode 25 */}
          <BentoCard highlight delay={0.12}>
            <Tag>Encode 25 — National Finalist</Tag>
            <SmallStat value="2nd Place" accent />
            <p style={{ fontSize: 11.5, color: "var(--text-2)", lineHeight: 1.65 }}>
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>LearnityX</strong>{" "}
              placed 2nd nationally among 500+ teams.
            </p>
            <GlowOrb top={-30} right={-30} size={90} />
          </BentoCard>

          {/* 4. LeetCode */}
          <BentoCard highlight delay={0.16}>
            <Tag>Competitive Programming</Tag>
            <SmallStat value="300+" accent />
            <p style={{ fontSize: 11.5, color: "var(--text-2)", lineHeight: 1.65 }}>
              300+ LeetCode problems — consistent practice in DSA, algorithms, and system design.
            </p>
            <div style={{
              position: "absolute", bottom: 12, right: 16,
              fontFamily: "var(--font-mono)", fontSize: 18,
              color: "rgba(137,196,174,0.12)", userSelect: "none",
            }}>
              {"{ }"}
            </div>
          </BentoCard>

          {/* 5. Academic */}
          <BentoCard delay={0.20}>
            <Tag>Academic</Tag>
            <SmallStat value={educationHistory[0].score} />
            <p style={{ fontSize: 11.5, color: "var(--text-2)", lineHeight: 1.65 }}>
              B.E. CSE — MVSR Engineering College, graduating 2026.
            </p>
            <span style={{
              position: "absolute", bottom: 12, right: 16,
              fontFamily: "var(--font-mono)", fontSize: 8,
              color: "var(--text-3)", letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              CGPA / 10.0
            </span>
          </BentoCard>

          {/* ══ Row 3: Hackathon wins (2 cols) + Certifications (1 col) ══ */}

          {/* 6. Total hackathon wins — small accent banner */}
          <BentoCard delay={0.24} style={{ gridColumn: "span 2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "clamp(16px,4vw,40px)", flexWrap: "wrap" }}>
              <div>
                <Tag>Hackathon Track Record</Tag>
                <p style={{
                  fontFamily: "var(--font-grotesk)", fontWeight: 900,
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  letterSpacing: "-0.05em", lineHeight: 1,
                  color: "var(--text)", margin: "0 0 6px",
                }}>
                  4× <span style={{ color: "var(--accent)" }}>Wins</span>
                </p>
                <p style={{ fontSize: 11.5, color: "var(--text-2)", lineHeight: 1.6 }}>
                  Including 2 national-level events — HackSavvy &amp; Encode 25.
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  { label: "HackSavvy 2025", badge: <PlaceBadge place={1} scope="National" /> },
                  { label: "Encode 25",      badge: <PlaceBadge place={2} scope="National" /> },
                  { label: "CSI Hackathon",  badge: <PlaceBadge place={1} scope="Regional" /> },
                  { label: "MVSR Internal",  badge: <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><TrophyIcon />1st / 100</span> },
                ].map(w => (
                  <div key={w.label} style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border-2)",
                    borderRadius: 8, padding: "5px 11px",
                  }}>
                    <p style={{ margin: 0, fontSize: 10, fontFamily: "var(--font-grotesk)", fontWeight: 600, color: "var(--text)", letterSpacing: "-0.01em" }}>
                      {w.label}
                    </p>
                    <p style={{ margin: 0, fontSize: 8.5, fontFamily: "var(--font-mono)", color: "var(--text-3)", letterSpacing: "0.04em" }}>
                      {w.badge}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* 7. Certifications */}
          <BentoCard delay={0.28}>
            <Tag>Certifications</Tag>
            <SmallStat value={`${certifications.length}`} />
            <p style={{ fontSize: 11.5, color: "var(--text-2)", lineHeight: 1.65 }}>
              AWS Cloud Foundations · Generative AI · Web &amp; ML courses.
            </p>
          </BentoCard>

        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .bento-root { grid-template-columns: repeat(2, 1fr) !important; }
          .bento-root > *[style*="span 2"] { grid-column: span 2 !important; }
        }
        @media (max-width: 560px) {
          .bento-root { grid-template-columns: 1fr !important; gap: 8px !important; }
          .bento-root > *[style*="span 2"] { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}

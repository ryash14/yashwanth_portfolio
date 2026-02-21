"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/lib/data";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

// ── Signature curtain-reveal ──────────────────────────────────────────
function Signature() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <span style={{
        fontFamily: "var(--font-signature)",
        fontSize: "clamp(2rem, 4vw, 2.8rem)",
        color: "var(--accent)", lineHeight: 1.3,
        display: "block", userSelect: "none", paddingRight: 8,
      }}>
        Yashwanth
      </span>
      <motion.div
        initial={{ scaleX: 1 }}
        animate={inView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", inset: 0,
          background: "var(--bg)", transformOrigin: "right",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// ── Trait rows ────────────────────────────────────────────────────────
const TRAITS = [
  { tag: "Work",      text: "3× internships (ISRO NRSC, DLRL DRDO, MVSR college) — production-ready systems" },
  { tag: "Compete",   text: "300+ LeetCode problems — consistent DSA & system design practice" },
  { tag: "Hack",      text: "4× hackathon winner — including HackSavvy 2025 & Encode 25 (national)" },
  { tag: "Lead",      text: "MVSR website redesign Team Lead — won internal hackathon (1st/100 teams)" },
  { tag: "Architect", text: "ML pipelines, RAG systems, distributed backends, and clean product engineering" },
];

// ── Section ───────────────────────────────────────────────────────────
export default function About() {
  return (
    <section id="about">
      <div className="h-rule" />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(80px,10vw,140px) clamp(24px,4vw,48px)" }}>

        {/* ── Header row ── */}
        <Reveal>
          <div style={{
            display: "flex", alignItems: "baseline", justifyContent: "space-between",
            marginBottom: "clamp(48px,6vw,72px)", flexWrap: "wrap", gap: 16,
          }}>
            <p className="label">01 — About</p>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer"
              className="link" style={{ fontSize: 11 }}>
              Connect on LinkedIn ↗
            </a>
          </div>
        </Reveal>

        {/* ── Two-column layout ── */}
        <div className="about-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "start",
        }}>

          {/* ── Left: bio + traits + links ── */}
          <div>
            <Reveal delay={0.08}>
              <h2 style={{
                fontFamily: "var(--font-grotesk)", fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 3.4rem)",
                letterSpacing: "-0.04em", lineHeight: 1.06,
                color: "var(--text)",
                margin: "0 0 clamp(22px,3vh,32px)",
              }}>
                From research labs<br />
                <span style={{ color: "var(--accent)" }}>to live products.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.13}>
              <p style={{
                fontSize: "clamp(13.5px, 1.1vw, 15px)", lineHeight: 1.9,
                color: "var(--text-2)", marginBottom: 14, maxWidth: 560,
              }}>
                I&apos;m Yashwanth Reddy Reddygari — a Full Stack Developer and final-year CSE
                student from Hyderabad. I specialize in building scalable, production-ready
                systems that sit at the intersection of AI research and real-world software.
                From satellite data at ISRO to offline RAG pipelines at DRDO — the work
                I do solves problems that actually matter.
              </p>
              <p style={{
                fontSize: "clamp(13.5px, 1.1vw, 15px)", lineHeight: 1.9,
                color: "var(--text-2)", marginBottom: 36, maxWidth: 560,
              }}>
                I led a team of five to redesign the official{" "}
                <strong style={{ color: "var(--text)", fontWeight: 600 }}>MVSR Engineering College</strong>{" "}
                website after winning an internal hackathon — honing my leadership and
                collaboration instincts. Outside code, I&apos;m a badminton player, cricket
                fan, and always up for a strategic game. Actively seeking full-time SDE
                roles post-graduation in 2026.
              </p>
            </Reveal>

            {/* Traits list */}
            <Reveal delay={0.18}>
              <div style={{ borderTop: "1px solid var(--border)", marginBottom: 36 }}>
                {TRAITS.map((t, i) => (
                  <motion.div
                    key={t.tag}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.22 + i * 0.07 }}
                    style={{
                      display: "flex", alignItems: "baseline", gap: 16,
                      padding: "12px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: 8.5,
                      color: "var(--accent)", letterSpacing: "0.14em",
                      textTransform: "uppercase", flexShrink: 0, minWidth: 64,
                    }}>
                      {t.tag}
                    </span>
                    <span style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6 }}>
                      {t.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Reveal>

            {/* Links + signature */}
            <Reveal delay={0.26}>
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", flexWrap: "wrap", gap: 20,
              }}>
                <div style={{ display: "flex", gap: 20 }}>
                  {[
                    { href: siteConfig.github,   l: "GitHub ↗"   },
                    { href: siteConfig.linkedin, l: "LinkedIn ↗" },
                    { href: siteConfig.leetcode, l: "LeetCode ↗" },
                  ].map(({ href, l }) => (
                    <a key={l} href={href} target="_blank" rel="noopener noreferrer"
                      className="link" style={{ fontSize: 12 }}>
                      {l}
                    </a>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <p style={{
                    fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase",
                    color: "var(--text-3)", marginBottom: 6, fontFamily: "var(--font-mono)",
                  }}>
                    Signed
                  </p>
                  <Signature />
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Right: identity + contact panel ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Availability card */}
            <Reveal delay={0.15}>
              <div style={{
                background: "rgba(137,196,174,0.06)",
                border: "1px solid rgba(137,196,174,0.22)",
                borderRadius: 12, padding: "20px 20px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: "var(--accent)", flexShrink: 0,
                    animation: "pulse-dot 2s infinite",
                    boxShadow: "0 0 8px var(--accent-glow-lg)",
                  }} />
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 8.5,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: "var(--accent)",
                  }}>
                    Available
                  </span>
                </div>
                <p style={{
                  fontFamily: "var(--font-grotesk)", fontWeight: 800,
                  fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)",
                  letterSpacing: "-0.03em", lineHeight: 1.1,
                  color: "var(--text)", marginBottom: 8,
                }}>
                  Open to Full-Time SDE Roles
                </p>
                <p style={{
                  fontSize: 11.5, fontFamily: "var(--font-mono)",
                  color: "var(--text-3)", lineHeight: 1.6, letterSpacing: "0.02em",
                }}>
                  Graduating 2026 · AI / Full Stack<br />
                  Remote or On-site · Hyderabad, India
                </p>
              </div>
            </Reveal>

            {/* Contact quick-reach */}
            <Reveal delay={0.20}>
              <div style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12, overflow: "hidden",
              }}>
                <div style={{
                  padding: "10px 16px",
                  borderBottom: "1px solid var(--border)",
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 8,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: "var(--text-3)",
                  }}>
                    Reach me
                  </span>
                </div>
                {[
                  { label: "Email",    href: `mailto:${siteConfig.email}`,   value: siteConfig.email,   ext: false },
                  { label: "GitHub",   href: siteConfig.github,              value: "github.com/ryash14", ext: true  },
                  { label: "LinkedIn", href: siteConfig.linkedin,            value: "in/yashredd",        ext: true  },
                  { label: "LeetCode", href: siteConfig.leetcode,            value: "Yashwanth1408",       ext: true  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.ext ? "_blank" : undefined}
                    rel={item.ext ? "noopener noreferrer" : undefined}
                    style={{
                      display: "flex", alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 16px",
                      borderBottom: "1px solid var(--border)",
                      textDecoration: "none",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--bg)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: 8.5,
                      color: "var(--text-3)", letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}>
                      {item.label}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: 10,
                      color: "var(--accent)", letterSpacing: "0.02em",
                      display: "flex", alignItems: "center", gap: 4,
                    }}>
                      {item.value}
                      {item.ext && <span style={{ opacity: 0.5, fontSize: 8 }}>↗</span>}
                    </span>
                  </a>
                ))}
                <div style={{ padding: "10px 16px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {["AI", "Full Stack", "ML Pipelines", "System Design"].map(tag => (
                      <span key={tag} style={{
                        fontSize: 8.5, padding: "3px 9px", borderRadius: 99,
                        border: "1px solid var(--border-2)",
                        color: "var(--text-3)", fontFamily: "var(--font-mono)",
                        letterSpacing: "0.04em", background: "var(--bg)",
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

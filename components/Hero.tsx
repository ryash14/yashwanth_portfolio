"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";

function GitHubIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function LeetCodeIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.483 0a1.374 1.374 0 00-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 00-1.209 2.104 5.35 5.35 0 00-.125.513 5.527 5.527 0 00.062 2.362 5.83 5.83 0 00.349 1.017 5.938 5.938 0 001.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 00-1.951-.003l-2.396 2.392a3.021 3.021 0 01-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 01.066-.523 2.545 2.545 0 01.619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 00-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0013.483 0zm-2.866 12.815a1.38 1.38 0 00-1.38 1.382 1.38 1.38 0 001.38 1.382H20.79a1.38 1.38 0 001.38-1.382 1.38 1.38 0 00-1.38-1.382z" />
    </svg>
  );
}

function SocialBtn({ href, icon, label, delay }: { href: string; icon: React.ReactNode; label: string; delay: number }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: 36, height: 36,
        display: "flex", alignItems: "center", justifyContent: "center",
        border: `1px solid ${hov ? "var(--border-2)" : "var(--border)"}`,
        borderRadius: 5,
        color: hov ? "var(--text)" : "var(--text-3)",
        background: hov ? "var(--surface)" : "transparent",
        transition: "all 0.2s",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        textDecoration: "none",
      }}
    >
      {icon}
    </motion.a>
  );
}

// ── Terminal profile card ─────────────────────────────────────────────
const PROFILE_LINES = [
  { key: "name", val: "Yashwanth Reddy R." },
  { key: "role", val: "AI & Full Stack Dev" },
  { key: "location", val: "Hyderabad, India" },
  { key: "education", val: "B.E. CSE · MVSR · 8.87 CGPA" },
  { key: "internships", val: "3×(ISRO NRSC, DLRL, College)" },
  { key: "projects", val: "7+ shipped" },
  { key: "leetcode", val: "300+ solved" },
  { key: "status", val: "open to work" },
];

function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 32, y: 16 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        border: "1px solid var(--border-2)",
        borderRadius: 12,
        overflow: "hidden",
        background: "var(--surface)",
      }}
    >
      {/* Terminal header */}
      <div style={{
        padding: "12px 18px",
        borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", gap: 10,
        background: "var(--bg)",
      }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["var(--border-2)", "var(--border-2)", "var(--border-2)"].map((c, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 10,
          color: "var(--text-3)", letterSpacing: "0.12em",
          flex: 1, textAlign: "center",
        }}>
          profile.json
        </span>
        <div style={{ width: 44 }} />
      </div>

      {/* JSON content */}
      <div style={{
        padding: "20px 22px",
        fontFamily: "var(--font-mono)", fontSize: 12,
        lineHeight: 1.7,
      }}>
        <div style={{ color: "var(--text-3)", marginBottom: 4 }}>{`{`}</div>
        {PROFILE_LINES.map((line, i) => (
          <motion.div
            key={line.key}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.07, duration: 0.4, ease: "easeOut" }}
            style={{ paddingLeft: 20, display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" }}
          >
            <span style={{ color: "var(--text-3)" }}>&quot;</span>
            <span style={{ color: "var(--text-2)" }}>{line.key}</span>
            <span style={{ color: "var(--text-3)" }}>&quot;</span>
            <span style={{ color: "var(--text-3)", marginRight: 4 }}>:</span>
            {line.key === "status" ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <span style={{ color: "var(--text-3)" }}>&quot;</span>
                <span style={{ color: "var(--accent)", fontWeight: 600 }}>{line.val}</span>
                <span style={{ color: "var(--text-3)" }}>&quot;</span>
                <span style={{
                  display: "inline-block", width: 6, height: 6, borderRadius: "50%",
                  background: "var(--accent)",
                  boxShadow: "0 0 6px var(--accent)",
                  animation: "pulse-dot 2s infinite",
                }} />
              </span>
            ) : (
              <>
                <span style={{ color: "var(--text-3)" }}>&quot;</span>
                <span style={{ color: "var(--text)" }}>{line.val}</span>
                <span style={{ color: "var(--text-3)" }}>&quot;</span>
              </>
            )}
            {i < PROFILE_LINES.length - 1 && (
              <span style={{ color: "var(--text-3)" }}>,</span>
            )}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{ color: "var(--text-3)", marginTop: 4 }}
        >
          {`}`}
        </motion.div>
      </div>

      {/* Footer strip */}
      <div style={{
        borderTop: "1px solid var(--border)",
        padding: "10px 22px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 9,
          color: "var(--text-3)", letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}>
          class of &apos;26
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          style={{
            fontFamily: "var(--font-mono)", fontSize: 9,
            color: "var(--accent)", letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          ● open to work
        </motion.span>
      </div>
    </motion.div>
  );
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("work");
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: y - 80, // adjust if navbar height differs
      behavior: "smooth",
    });
  };

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        minHeight: "100svh",
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        padding: "clamp(88px, 13vh, 128px) 0 clamp(48px, 7vh, 72px)",
        overflowX: "clip",
      }}
    >
      {/* Glow — left side */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 50% 60% at 15% 55%, var(--accent-glow) 0%, transparent 65%)",
      }} />
      {/* Glow — right side */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 45% 50% at 78% 35%, var(--accent-bg) 0%, transparent 60%)",
      }} />

      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        opacity: 0.3,
        maskImage: "radial-gradient(ellipse 85% 70% at 50% 50%, black 20%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 85% 70% at 50% 50%, black 20%, transparent 100%)",
      }} />

      {/* Subtle horizontal rule lines */}
      <div style={{
        position: "absolute", top: "20%", left: 0, right: 0,
        height: "1px", background: "linear-gradient(to right, transparent, var(--border) 20%, var(--border) 80%, transparent)",
        opacity: 0.25, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", left: 0, right: 0,
        height: "1px", background: "linear-gradient(to right, transparent, var(--border) 20%, var(--border) 80%, transparent)",
        opacity: 0.25, pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "0 clamp(24px, 4vw, 48px)",
        width: "100%", position: "relative", zIndex: 1,
      }}>

        {/* ── 2-column split ── */}
        <div className="hero-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 400px",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "center",
        }}>

          {/* ── Left column ── */}
          <div>
            {/* Eyebrow — location · role · year */}
            <motion.div
              {...fadeUp(0.05)}
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "clamp(28px, 4vh, 44px)" }}
            >
              {[siteConfig.location, siteConfig.title, "Class of ʼ26"].map((t, i) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {i > 0 && (
                    <span style={{
                      width: 3, height: 3, borderRadius: "50%",
                      background: "var(--border-2)", flexShrink: 0,
                    }} />
                  )}
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 10,
                    color: "var(--text-2)", letterSpacing: "0.16em", textTransform: "uppercase",
                  }}>{t}</span>
                </div>
              ))}
            </motion.div>

            {/* Main headline — tagline, large */}
            <div style={{ marginBottom: "clamp(20px, 3vh, 32px)" }}>
              {(["Engineering ideas", "into impact."] as const).map((line, i) => (
                <motion.h1
                  key={line}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.05, delay: 0.12 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "var(--font-grotesk)", fontWeight: 700,
                    fontSize: "clamp(2.6rem, 5.5vw, 6rem)",
                    letterSpacing: "-0.04em", lineHeight: 0.96,
                    color: i === 1 ? "var(--text-2)" : "var(--text)",
                    margin: 0, paddingBottom: "0.08em",
                  }}
                >
                  {i === 1 ? (
                    <>
                      into impact<span style={{ color: "var(--accent)" }}>.</span>
                    </>
                  ) : line}
                </motion.h1>
              ))}
            </div>

            {/* Sub-descriptor */}
            <motion.p
              {...fadeUp(0.32)}
              style={{
                fontFamily: "var(--font-grotesk)",
                fontSize: "clamp(0.88rem, 1.15vw, 1.0rem)",
                color: "var(--text-3)", fontWeight: 400,
                letterSpacing: "-0.005em", lineHeight: 1.7,
                maxWidth: 460, margin: "0 0 clamp(28px, 4vh, 40px)",
              }}
            >
              Building scalable software — from distributed backend systems to polished user-facing products.
            </motion.p>

            {/* Rule */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: "1px", background: "var(--border)", marginBottom: "clamp(20px, 3vh, 32px)" }}
            />

            {/* Bottom strip — CTAs + socials */}
            <motion.div
              {...fadeUp(0.46)}
              style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", flexWrap: "wrap", gap: 16,
              }}
            >
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <a href="#work" onClick={scrollToWork} className="btn-primary" style={{ fontSize: 12, padding: "10px 22px" }}>
                  View Work
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a href={siteConfig.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: 12, padding: "9px 22px" }}>
                  Resume ↗
                </a>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <SocialBtn href={siteConfig.github} icon={<GitHubIcon />} label="GitHub" delay={0.50} />
                <SocialBtn href={siteConfig.linkedin} icon={<LinkedInIcon />} label="LinkedIn" delay={0.55} />
                <SocialBtn href={siteConfig.leetcode} icon={<LeetCodeIcon />} label="LeetCode" delay={0.60} />
                <span style={{ width: "1px", height: 18, background: "var(--border)", margin: "0 4px" }} />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hero-email"
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: 10,
                    color: "var(--text-2)", textDecoration: "none",
                    letterSpacing: "0.08em", transition: "color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}
                >
                  {siteConfig.email}
                </a>
              </div>
            </motion.div>
          </div>

          {/* ── Right column: terminal card ── */}
          <div className="hero-card-col">
            <ProfileCard />
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}
        style={{
          position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
        }}
      >
        <span style={{ fontSize: 7, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--text-3)" }}>
          Scroll
        </span>
        <div style={{ width: 1, height: 32, background: "var(--border)", position: "relative", overflow: "hidden" }}>
          <motion.div
            style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", background: "var(--accent)" }}
            animate={{ y: ["-100%", "260%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 600px) { .hero-email { display: none !important; } }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-card-col { margin-top: 8px; }
          .hero-section { padding-top: 96px !important; padding-bottom: 48px !important; }
        }
      `}</style>
    </section>
  );
}

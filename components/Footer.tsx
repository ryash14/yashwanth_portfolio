"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/lib/data";

const NAV_LINKS = [
  { href: "#hero",       label: "Home"       },
  { href: "#work",       label: "Projects"   },
  { href: "#experience", label: "Experience" },
  { href: "#skills",     label: "Skills"     },
  { href: "#education",  label: "Education"  },
  { href: "#contact",    label: "Contact"    },
];

const SOCIAL_LINKS = [
  { href: siteConfig.github,             label: "GitHub",   ext: true  },
  { href: siteConfig.linkedin,           label: "LinkedIn", ext: true  },
  { href: `mailto:${siteConfig.email}`,  label: "Email",    ext: false },
];

export default function Footer() {
  const footerRef = useRef(null);
  const inView    = useInView(footerRef, { once: true, margin: "-60px" });

  const handleTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} style={{ position: "relative", overflow: "hidden" }}>
      <div className="h-rule" />

      {/* ── Watermark ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.6, ease: "easeOut" }}
        aria-hidden="true"
        className="footer-watermark"
        style={{
          position: "absolute",
          bottom: 32, left: 0, right: 0,
          zIndex: 0, pointerEvents: "none", userSelect: "none",
          lineHeight: 0.88, textAlign: "center",
        }}
      >
        <span style={{
          fontFamily: "var(--font-grotesk)", fontWeight: 800,
          fontSize: "clamp(3rem, 9vw, 13rem)",
          letterSpacing: "-0.04em", color: "transparent",
          WebkitTextStroke: "1px var(--text-2)",
          whiteSpace: "nowrap", display: "inline-block", opacity: 0.18,
        }}>
          Yashwanth Reddy<span style={{ WebkitTextStroke: "1px var(--accent)" }}>.</span>
        </span>
      </motion.div>

      {/* ── Content ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* ── Main row: logo · nav links · social links ── */}
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          padding: "clamp(36px,5vw,56px) clamp(24px,4vw,48px) clamp(28px,4vw,44px)",
        }}>
          <div className="footer-main-row" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(20px,4vw,40px)",
            flexWrap: "wrap",
          }}>

            {/* Logo */}
            <div style={{ flexShrink: 0 }}>
              <span style={{
                fontFamily: "var(--font-grotesk)", fontWeight: 800,
                fontSize: 17, color: "var(--text)", letterSpacing: "-0.04em",
                lineHeight: 1,
              }}>
                YR<span style={{ color: "var(--accent)" }}>.</span>
              </span>
            </div>

            {/* Nav links */}
            <nav className="footer-nav" style={{
              display: "flex",
              gap: "clamp(10px,2vw,24px)",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}>
              {NAV_LINKS.map(({ href, label }) => (
                <a key={label} href={href}
                  style={{
                    fontSize: 11, color: "var(--text-3)",
                    textDecoration: "none", transition: "color 0.2s",
                    fontFamily: "var(--font-mono)", letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}>
                  {label}
                </a>
              ))}
            </nav>

            {/* Social links */}
            <div style={{ display: "flex", gap: 18, alignItems: "center", flexShrink: 0 }}>
              {SOCIAL_LINKS.map(({ href, label, ext }) => (
                <a key={label} href={href}
                  target={ext ? "_blank" : undefined}
                  rel={ext ? "noopener noreferrer" : undefined}
                  style={{
                    fontSize: 11, color: "var(--text-3)",
                    textDecoration: "none", transition: "color 0.2s",
                    fontFamily: "var(--font-mono)", letterSpacing: "0.05em",
                    display: "inline-flex", alignItems: "center", gap: 3,
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}>
                  {label}
                  {ext && <span style={{ opacity: 0.4, fontSize: 9 }}>↗</span>}
                </a>
              ))}
            </div>

          </div>
        </div>

        {/* ── Spacer for watermark ── */}
        <div style={{ height: "clamp(2rem, 5vw, 6rem)" }} />

        {/* ── Bottom bar ── */}
        <div className="h-rule" />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "12px clamp(24px,4vw,48px)" }}>
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: 10,
          }}>
            <span style={{
              fontSize: 10, color: "var(--text-3)",
              fontFamily: "var(--font-mono)", letterSpacing: "0.05em",
            }}>
              © {new Date().getFullYear()} {siteConfig.name}
            </span>

            <button onClick={handleTop} aria-label="Back to top"
              style={{
                display: "flex", alignItems: "center", gap: 5,
                border: "none", background: "transparent", cursor: "pointer",
                color: "var(--text-3)", transition: "color 0.2s",
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.12em", textTransform: "uppercase", padding: 0,
              }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "var(--text-2)"}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "var(--text-3)"}>
              Back to top
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5">
                <polyline points="18,15 12,9 6,15" />
              </svg>
            </button>
          </div>
        </div>

      </motion.div>

      <style>{`
        @media (max-width: 680px) {
          .footer-main-row { flex-direction: column; align-items: flex-start !important; gap: 20px !important; }
          .footer-nav { justify-content: flex-start !important; }
          .footer-watermark { display: none !important; }
        }
      `}</style>
    </footer>
  );
}

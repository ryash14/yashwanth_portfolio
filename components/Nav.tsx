"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

const DRAWER_LINKS = [
  { href: "#about",      label: "About",      num: "01" },
  { href: "#experience", label: "Experience", num: "02" },
  { href: "#work",       label: "Work",       num: "03" },
  { href: "#skills",     label: "Skills",     num: "04" },
  { href: "#education",  label: "Education",  num: "05" },
  { href: "#contact",    label: "Contact",    num: "06" },
];

function scrollToSection(href: string) {
  const el = document.querySelector(href) as HTMLElement | null;
  if (!el) return;
  const targetY = el.getBoundingClientRect().top + window.scrollY - 80;
  const startY  = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 1) return;

  // Custom rAF smooth scroll — bypasses html{scroll-behavior:smooth} which
  // iOS Safari cancels mid-animation. Each frame is an instant position set,
  // so there is nothing for iOS to cancel.
  const html = document.documentElement;
  html.style.scrollBehavior = "auto"; // disable CSS smooth scroll during animation
  const duration = 540;
  const start = performance.now();

  function step(now: number) {
    const t = Math.min((now - start) / duration, 1);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - t, 3);
    window.scrollTo(0, startY + distance * ease);
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      html.style.scrollBehavior = ""; // restore
    }
  }
  requestAnimationFrame(step);
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const [active,   setActive]   = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const secs = Array.from(
        document.querySelectorAll("section[id]")
      ).reverse() as HTMLElement[];
      for (const s of secs) {
        if (window.scrollY >= s.offsetTop - 100) { setActive(s.id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    // Must scroll immediately within the user gesture — iOS Safari blocks
    // any scrollTo / scrollIntoView called from setTimeout/rAF.
    scrollToSection(href);
    setOpen(false);
  };

  return (
    <>
      {/* ── Fixed header ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? "var(--nav-bg)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "background .35s, border-color .35s",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px, 3vw, 32px)" }}>
          <div style={{ display: "flex", alignItems: "center", height: 64 }}>

            {/* Logo */}
            <a href="#hero" onClick={e => handleLink(e, "#hero")}
              style={{ marginRight: "auto", textDecoration: "none", display: "flex", alignItems: "center", gap: 0 }}>
              <span style={{
                fontFamily: "var(--font-grotesk)", fontWeight: 800,
                fontSize: 18, letterSpacing: "-0.05em",
                color: "var(--text)", lineHeight: 1,
              }}>Y<span style={{ color: "var(--accent)" }}>R</span></span>
              <span className="nav-portfolio-text" style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                color: "var(--text-3)", letterSpacing: "0.18em",
                textTransform: "uppercase", marginLeft: 10,
                paddingLeft: 10,
                borderLeft: "1px solid var(--border-2)",
                lineHeight: 1,
              }}>portfolio</span>
            </a>

            {/* Right cluster */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

              {/* Reach Out CTA */}
              <a
                href="#contact"
                onClick={e => handleLink(e, "#contact")}
                className="nav-reach-out"
                style={{
                  fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
                  textTransform: "uppercase", textDecoration: "none",
                  color: "var(--accent)",
                  padding: "7px 14px",
                  border: "1px solid var(--accent-border)",
                  borderRadius: 4,
                  background: "var(--accent-bg)",
                  transition: "border-color 0.2s, background 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent-border-hover)";
                  (e.currentTarget as HTMLAnchorElement).style.background  = "var(--accent-bg-mid)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent-border)";
                  (e.currentTarget as HTMLAnchorElement).style.background  = "var(--accent-bg)";
                }}>
                Reach Out
              </a>

              <ThemeToggle />

              {/* Hamburger / X */}
              <button
                onClick={() => setOpen(o => !o)}
                aria-label={open ? "Close menu" : "Open menu"}
                style={{
                  width: 36, height: 36, background: "transparent",
                  border: "1px solid var(--border-2)", borderRadius: 4,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "none",
                }}>
                <AnimatePresence mode="wait" initial={false}>
                  {open ? (
                    <motion.svg
                      key="x"
                      initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                      transition={{ duration: 0.18 }}
                      width="14" height="14" viewBox="0 0 24 24"
                      fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6"  y1="6" x2="18" y2="18" />
                    </motion.svg>
                  ) : (
                    <motion.div
                      key="ham"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      style={{ display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", gap: 4.5 }}>
                      <span style={{ display: "block", width: 14, height: 1.5, background: "var(--text)", borderRadius: 1 }} />
                      <span style={{ display: "block", width: 14, height: 1.5, background: "var(--text)", borderRadius: 1 }} />
                      <span style={{ display: "block", width: 10, height: 1.5, background: "var(--text)", borderRadius: 1, alignSelf: "flex-start" }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Backdrop ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 201,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
            }} />
        )}
      </AnimatePresence>

      {/* ── Right drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.nav
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0,
              width: "min(360px, 90vw)",
              background: "var(--bg)",
              borderLeft: "1px solid var(--border)",
              zIndex: 202,
              display: "flex", flexDirection: "column",
              padding: "80px 44px 48px",
            }}>

            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              style={{
                position: "absolute", top: 20, right: 20,
                width: 36, height: 36, border: "1px solid var(--border-2)",
                background: "transparent", borderRadius: 4,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--text-2)", transition: "border-color 0.2s, color 0.2s",
                cursor: "none",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--text-2)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--text)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-2)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--text-2)";
              }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6"  y2="18" />
                <line x1="6"  y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Nav links */}
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              {DRAWER_LINKS.map(({ href, label, num }, i) => {
                const isActive = active === href.slice(1);
                return (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={e => handleLink(e, href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      fontFamily: "var(--font-grotesk)", fontWeight: 700,
                      fontSize: "clamp(1.5rem, 3.5vw, 1.85rem)", letterSpacing: "-0.03em",
                      color: isActive ? "var(--accent)" : "var(--text)",
                      textDecoration: "none",
                      padding: "13px 0",
                      borderBottom: "1px solid var(--border)",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      transition: "color .2s",
                    }}
                    onMouseEnter={e => !isActive && (e.currentTarget.style.color = "var(--text-2)")}
                    onMouseLeave={e => !isActive && (e.currentTarget.style.color = "var(--text)")}>
                    <span style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: 10,
                        color: isActive ? "var(--accent)" : "var(--text-3)",
                        fontWeight: 400, letterSpacing: "0.12em",
                        transition: "color .2s",
                      }}>{num}</span>
                      {label}
                    </span>
                    <span style={{ fontSize: 12, opacity: 0.3, fontWeight: 400 }}>↗</span>
                  </motion.a>
                );
              })}
            </div>

            {/* Bottom row — socials + resume */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap", paddingTop: 28 }}>
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer"
                className="link" style={{ fontSize: 12 }}>GitHub</a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer"
                className="link" style={{ fontSize: 12 }}>LinkedIn</a>
              <a href={siteConfig.resume} target="_blank" rel="noopener noreferrer"
                className="btn-ghost"
                style={{ padding: "8px 18px", fontSize: 12, marginLeft: "auto" }}>
                Resume ↗
              </a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) { .nav-portfolio-text { display: none !important; } }
        @media (max-width: 480px) { .nav-reach-out { display: none !important; } }
      `}</style>
    </>
  );
}

"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "clamp(24px, 5vw, 64px)",
      }}
    >
      {/* Dot grid background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        opacity: 0.3,
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)",
      }} />

      {/* Radial glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 45% 45% at 50% 45%, var(--accent-glow) 0%, transparent 70%)",
      }} />

      {/* Corner marks */}
      {[
        { top: 32, left: 32, borderTop: "1px solid var(--border-2)", borderLeft: "1px solid var(--border-2)" },
        { top: 32, right: 32, borderTop: "1px solid var(--border-2)", borderRight: "1px solid var(--border-2)" },
        { bottom: 32, left: 32, borderBottom: "1px solid var(--border-2)", borderLeft: "1px solid var(--border-2)" },
        { bottom: 32, right: 32, borderBottom: "1px solid var(--border-2)", borderRight: "1px solid var(--border-2)" },
      ].map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.07 }}
          style={{ position: "absolute", width: 24, height: 24, ...s }}
        />
      ))}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 520 }}>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "clamp(40px, 6vh, 64px)" }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{
              fontFamily: "var(--font-grotesk)", fontWeight: 800,
              fontSize: 22, letterSpacing: "-0.05em",
              color: "var(--text)", lineHeight: 1,
            }}>
              Y<span style={{ color: "var(--accent)" }}>R</span>
              <span style={{ color: "var(--text-3)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, marginLeft: 10 }}>
                portfolio
              </span>
            </span>
          </Link>
        </motion.div>

        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "clamp(16px, 3vh, 24px)", position: "relative" }}
        >
          <p style={{
            fontFamily: "var(--font-grotesk)", fontWeight: 800,
            fontSize: "clamp(6rem, 18vw, 14rem)",
            letterSpacing: "-0.06em", lineHeight: 0.9,
            color: "transparent",
            WebkitTextStroke: "1.5px var(--border-2)",
            userSelect: "none",
            margin: 0,
          }}>
            4<span style={{ WebkitTextStroke: "1.5px var(--accent-border-hover)" }}>0</span>4
          </p>
        </motion.div>

        {/* Rule */}
        <motion.div
          initial={{ scaleX: 0, originX: 0.5 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: 1, background: "var(--border)",
            marginBottom: "clamp(20px, 3vh, 28px)",
          }}
        />

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{
            fontFamily: "var(--font-grotesk)", fontWeight: 700,
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            letterSpacing: "-0.025em", lineHeight: 1.2,
            color: "var(--text)", marginBottom: 12,
          }}>
            Page not found.
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.2vw, 14px)", lineHeight: 1.75,
            color: "var(--text-3)", marginBottom: "clamp(28px, 4vh, 40px)",
            fontFamily: "var(--font-grotesk)",
          }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link href="/" className="btn-primary" style={{ fontSize: 12, padding: "10px 24px" }}>
            Go Home
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/#contact" className="btn-ghost" style={{ fontSize: 12, padding: "9px 24px" }}>
            Contact me
          </Link>
        </motion.div>

        {/* Code note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: "clamp(28px, 5vh, 44px)",
            fontFamily: "var(--font-mono)", fontSize: 10,
            color: "var(--text-3)", letterSpacing: "0.1em",
          }}
        >
          ERROR_CODE: 404 · ROUTE_NOT_FOUND
        </motion.p>
      </div>
    </div>
  );
}

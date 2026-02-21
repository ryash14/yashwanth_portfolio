"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Dismiss after 1.8 s
    const t = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 9000,
            background: "var(--bg)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 32,
          }}
        >
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: "center" }}
          >
            <p style={{
              fontFamily: "var(--font-grotesk)",
              fontWeight: 800, fontSize: 48,
              letterSpacing: "-0.06em", lineHeight: 1,
              color: "var(--text)", margin: 0,
            }}>
              YR<span style={{ color: "var(--accent)" }}>.</span>
            </p>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "var(--text-3)", marginTop: 12,
              }}
            >
              Portfolio
            </motion.p>
          </motion.div>

          {/* Loading bar */}
          <div style={{
            width: 120, height: 1,
            background: "var(--border)",
            borderRadius: 99, overflow: "hidden",
            position: "relative",
          }}>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute", inset: 0,
                background: "var(--accent)",
                borderRadius: 99,
              }}
            />
          </div>

          {/* Corner decorations */}
          {[
            { top: 24, left: 24, borderTop: "1px solid var(--border-2)", borderLeft: "1px solid var(--border-2)" },
            { top: 24, right: 24, borderTop: "1px solid var(--border-2)", borderRight: "1px solid var(--border-2)" },
            { bottom: 24, left: 24, borderBottom: "1px solid var(--border-2)", borderLeft: "1px solid var(--border-2)" },
            { bottom: 24, right: 24, borderBottom: "1px solid var(--border-2)", borderRight: "1px solid var(--border-2)" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              style={{ position: "absolute", width: 24, height: 24, ...s }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

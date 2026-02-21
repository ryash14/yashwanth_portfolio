"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function KeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform));
  }, []);

  const mod = isMac ? "⌘" : "Ctrl";

  // Display list — Ctrl+K is owned by CommandPalette; listed here for discoverability only
  const DISPLAY_SHORTCUTS = [
    { keys: [mod, "K"],  description: "Open command palette"    },
    { keys: [mod, "?"],  description: "Show keyboard shortcuts" },
    { keys: [mod, "H"],  description: "Scroll to home"          },
    { keys: [mod, "E"],  description: "Scroll to experience"    },
    { keys: [mod, "W"],  description: "Scroll to projects"      },
    { keys: [mod, "C"],  description: "Scroll to contact"       },
    { keys: ["Esc"],     description: "Close any overlay"       },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMeta = e.metaKey || e.ctrlKey;

      if (isMeta && e.key === "?") {
        e.preventDefault();
        setShowHelp(prev => !prev);
      }
      if (isMeta && e.key.toLowerCase() === "h") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        setShowHelp(false);
      }
      if (isMeta && e.key.toLowerCase() === "e") {
        e.preventDefault();
        const el = document.querySelector("#experience") as HTMLElement;
        if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: "smooth" });
        setShowHelp(false);
      }
      if (isMeta && e.key.toLowerCase() === "w") {
        e.preventDefault();
        const el = document.querySelector("#work") as HTMLElement;
        if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: "smooth" });
        setShowHelp(false);
      }
      if (isMeta && e.key.toLowerCase() === "c") {
        e.preventDefault();
        const el = document.querySelector("#contact") as HTMLElement;
        if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: "smooth" });
        setShowHelp(false);
      }
      if (e.key === "Escape") {
        setShowHelp(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Help overlay */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowHelp(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 500,
              background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 20,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-2)",
                borderRadius: 14,
                padding: "28px 28px 22px",
                width: "min(460px, 92vw)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
                <div>
                  <p style={{
                    margin: 0, fontFamily: "var(--font-grotesk)", fontSize: 16,
                    fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em",
                  }}>
                    Keyboard shortcuts
                  </p>
                  <p style={{
                    margin: "3px 0 0", fontSize: 10, fontFamily: "var(--font-mono)",
                    color: "var(--text-3)", letterSpacing: "0.08em",
                  }}>
                    {isMac ? "macOS" : "Windows / Linux"}
                  </p>
                </div>
                <button
                  onClick={() => setShowHelp(false)}
                  style={{
                    width: 28, height: 28, borderRadius: 7,
                    border: "1px solid var(--border-2)", background: "var(--bg)",
                    color: "var(--text-3)", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Shortcut rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {DISPLAY_SHORTCUTS.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "9px 12px", borderRadius: 8,
                      background: "var(--bg)", border: "1px solid var(--border)",
                    }}
                  >
                    <span style={{
                      fontSize: 12.5, color: "var(--text-2)",
                      fontFamily: "var(--font-grotesk)",
                    }}>
                      {s.description}
                    </span>
                    <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      {s.keys.map((key, ki) => (
                        <span key={ki} style={{
                          fontSize: 10, padding: "3px 8px",
                          background: "var(--surface)",
                          border: "1px solid var(--border-2)",
                          borderRadius: 5,
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.03em",
                          color: "var(--text-3)",
                          minWidth: 30, textAlign: "center",
                        }}>
                          {key}
                        </span>
                      ))}
                    </span>
                  </motion.div>
                ))}
              </div>

              <p style={{
                fontSize: 10, color: "var(--text-3)", fontFamily: "var(--font-mono)",
                letterSpacing: "0.06em", marginTop: 18, marginBottom: 0, textAlign: "center",
              }}>
                ESC or click outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "hero",       label: "Home"       },
  { id: "about",      label: "About"      },
  { id: "bento",      label: "Highlights" },
  { id: "experience", label: "Experience" },
  { id: "work",       label: "Projects"   },
  { id: "skills",     label: "Skills"     },
  { id: "education",  label: "Education"  },
  { id: "contact",    label: "Contact"    },
];

export default function SectionNav() {
  const [active, setActive]   = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after scrolling past hero
    const onScroll = () => {
      setVisible(window.scrollY > 100);

      // Find active section via IntersectionObserver-style logic
      const offsets = SECTIONS.map(s => {
        const el = document.getElementById(s.id);
        if (!el) return { id: s.id, top: Infinity };
        return { id: s.id, top: Math.abs(el.getBoundingClientRect().top - 80) };
      });
      const closest = offsets.reduce((a, b) => (a.top < b.top ? a : b));
      setActive(closest.id);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <AnimatePresence>
      {visible && (
        <motion.nav
          key="section-nav"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Section navigation"
          className="section-nav-dots"
          style={{
            position: "fixed",
            right: 20,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 200,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            alignItems: "flex-end",
          }}
        >
          {SECTIONS.map(({ id, label }) => {
            const isActive  = active === id;
            const isHovered = hovered === id;

            return (
              <button
                key={id}
                onClick={() => navigate(id)}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                aria-label={`Go to ${label}`}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {/* Label — shows on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: isActive ? "var(--accent)" : "var(--text-3)",
                        userSelect: "none",
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                      }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Dot */}
                <motion.div
                  animate={{
                    width:   isActive ? 20 : isHovered ? 14 : 4,
                    height:  isActive ? 4 : isHovered ? 3 : 4,
                    borderRadius: isActive ? 2 : 99,
                    background: isActive
                      ? "var(--accent)"
                      : isHovered
                        ? "var(--text-2)"
                        : "var(--border-2)",
                    opacity: isActive ? 1 : isHovered ? 0.9 : 0.55,
                  }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  style={{ flexShrink: 0 }}
                />
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
    <style>{`
      @media (max-width: 900px) {
        .section-nav-dots { display: none !important; }
      }
    `}</style>
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig, projects } from "@/lib/data";

interface Command {
  id: string;
  name: string;
  description: string;
  category: "navigation" | "action";
  icon: string;
  action: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);

  const commands: Command[] = [
    {
      id: "home",
      name: "Go to Home",
      description: "Scroll to hero section",
      category: "navigation",
      icon: "🏠",
      action: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setOpen(false);
      },
    },
    {
      id: "work",
      name: "Go to Projects",
      description: "View all projects",
      category: "navigation",
      icon: "💼",
      action: () => {
        const el = document.querySelector("#work") as HTMLElement;
        if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: "smooth" });
        setOpen(false);
      },
    },
    {
      id: "exp",
      name: "Go to Experience",
      description: "View work experience",
      category: "navigation",
      icon: "💻",
      action: () => {
        const el = document.querySelector("#experience") as HTMLElement;
        if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: "smooth" });
        setOpen(false);
      },
    },
    {
      id: "skills",
      name: "Go to Skills",
      description: "View technical skills",
      category: "navigation",
      icon: "⚡",
      action: () => {
        const el = document.querySelector("#skills") as HTMLElement;
        if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: "smooth" });
        setOpen(false);
      },
    },
    {
      id: "contact",
      name: "Go to Contact",
      description: "Get in touch",
      category: "navigation",
      icon: "📧",
      action: () => {
        const el = document.querySelector("#contact") as HTMLElement;
        if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: "smooth" });
        setOpen(false);
      },
    },
    {
      id: "email",
      name: "Send Email",
      description: `Email: ${siteConfig.email}`,
      category: "action",
      icon: "✉️",
      action: () => {
        window.location.href = `mailto:${siteConfig.email}`;
        setOpen(false);
      },
    },
    {
      id: "github",
      name: "Open GitHub",
      description: "Visit GitHub profile",
      category: "action",
      icon: "🐙",
      action: () => {
        window.open(siteConfig.github, "_blank");
        setOpen(false);
      },
    },
    {
      id: "linkedin",
      name: "Open LinkedIn",
      description: "Visit LinkedIn profile",
      category: "action",
      icon: "💼",
      action: () => {
        window.open(siteConfig.linkedin, "_blank");
        setOpen(false);
      },
    },
  ];

  const filteredCommands = search
    ? commands.filter(cmd =>
        cmd.name.toLowerCase().includes(search.toLowerCase()) ||
        cmd.description.toLowerCase().includes(search.toLowerCase())
      )
    : commands;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMeta = e.metaKey || e.ctrlKey;

      if (isMeta && e.key === "k") {
        e.preventDefault();
        setOpen(prev => !prev);
        setSearch("");
        setSelectedIdx(0);
      }

      if (open) {
        if (e.key === "Escape") {
          setOpen(false);
          setSearch("");
        }

        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIdx(prev => (prev + 1) % filteredCommands.length);
        }

        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIdx(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        }

        if (e.key === "Enter" && filteredCommands.length > 0) {
          e.preventDefault();
          filteredCommands[selectedIdx]?.action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, filteredCommands, selectedIdx]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 400,
              background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", top: "50%", left: "50%", zIndex: 401,
              transform: "translate(-50%, -50%)",
              width: "min(600px, 90vw)",
              maxHeight: "70vh",
              background: "var(--surface)",
              border: "1px solid var(--border-2)",
              borderRadius: 12,
              overflow: "hidden",
              display: "flex", flexDirection: "column",
              boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
            }}
          >
            {/* Search input */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid var(--border)",
                background: "var(--bg)",
                display: "flex", alignItems: "center", gap: 10,
              }}
            >
              <span style={{ fontSize: 18 }}>🔍</span>
              <input
                autoFocus
                type="text"
                placeholder="Search commands..."
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  setSelectedIdx(0);
                }}
                style={{
                  flex: 1, border: "none", background: "transparent",
                  color: "var(--text)", fontSize: 14,
                  outline: "none", fontFamily: "inherit",
                }}
              />
              <span
                style={{
                  fontSize: 10, color: "var(--text-3)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.04em",
                }}
              >
                ESC to close
              </span>
            </div>

            {/* Commands list */}
            <div style={{ overflowY: "auto", flex: 1, maxHeight: "calc(70vh - 60px)" }}>
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, i) => (
                  <motion.button
                    key={cmd.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.02 }}
                    onClick={() => cmd.action()}
                    onMouseEnter={() => setSelectedIdx(i)}
                    style={{
                      width: "100%", padding: "12px 16px",
                      border: "none",
                      background: selectedIdx === i ? "var(--accent-dim)" : "transparent",
                      color: "var(--text)",
                      cursor: "pointer",
                      borderBottom: i < filteredCommands.length - 1 ? "1px solid var(--border)" : "none",
                      display: "flex", alignItems: "center", gap: 12,
                      transition: "background 0.15s",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{cmd.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>
                        {cmd.name}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>
                        {cmd.description}
                      </div>
                    </div>
                  </motion.button>
                ))
              ) : (
                <div
                  style={{
                    padding: "32px 16px", textAlign: "center",
                    color: "var(--text-3)", fontSize: 13,
                  }}
                >
                  No commands found
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

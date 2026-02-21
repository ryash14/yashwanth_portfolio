"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { projects, siteConfig } from "@/lib/data";

function IconGitHub() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
function IconExternal() {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// ── Sticky right panel ────────────────────────────────────────────────
function ProjectPreview({ project, index, total }: { project: typeof projects[number]; index: number; total: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      <div style={{
        height: 268, background: "var(--surface)", borderRadius: 14,
        position: "relative", overflow: "hidden",
        border: "1px solid var(--border)", marginBottom: 24,
      }}>
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image} alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: `linear-gradient(140deg, ${project.gradFrom} 0%, ${project.gradTo} 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 800, fontSize: 80, color: project.accentColor, opacity: 0.15, letterSpacing: "-0.05em" }}>{project.num}</span>
          </div>
        )}
        <div style={{ position: "absolute", bottom: 10, left: 12, display: "flex", gap: 5 }}>
          {project.tags.map(t => (
            <span key={t} style={{ fontSize: 8, padding: "3px 8px", borderRadius: 99, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", border: `1px solid ${project.accentColor}40`, color: project.accentColor, fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10, gap: 12 }}>
        <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 800, fontSize: "clamp(1.35rem, 2vw, 1.75rem)", letterSpacing: "-0.035em", lineHeight: 1.1, color: "var(--text)", margin: 0 }}>
          {project.title}
        </h3>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-3)", letterSpacing: "0.12em", flexShrink: 0, marginTop: 4 }}>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
      <p style={{ fontSize: 13.5, lineHeight: 1.85, color: "var(--text-2)", marginBottom: 18 }}>{project.description}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 22 }}>
        {project.stack.map(s => (
          <span key={s} style={{ fontSize: 9.5, padding: "3px 9px", borderRadius: 4, border: "1px solid var(--border-2)", color: "var(--text-3)", fontFamily: "var(--font-mono)", letterSpacing: "0.04em", background: "var(--surface)" }}>{s}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost"
          style={{ fontSize: 11, padding: "8px 18px", display: "flex", alignItems: "center", gap: 6 }}>
          <IconGitHub /> GitHub
        </a>
        {project.live !== "#" && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary"
            style={{ fontSize: 11, padding: "8px 18px", display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
            View Live <IconExternal />
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ── List row ──────────────────────────────────────────────────────────
function ProjectRow({ project, isActive, onHover, onClick, delay }: {
  project: typeof projects[number]; isActive: boolean; onHover: () => void; onClick: () => void; delay: number;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onHover} onClick={onClick}
      style={{ display: "flex", alignItems: "center", padding: "clamp(16px,2vw,20px) 0", borderBottom: "1px solid var(--border)", position: "relative", cursor: "pointer", opacity: isActive ? 1 : 0.5, transition: "opacity 0.25s" }}
    >
      <motion.div
        animate={{ scaleY: isActive ? 1 : 0.3, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", left: 0, top: "20%", bottom: "20%", width: 2.5, background: `linear-gradient(180deg, transparent, ${project.accentColor}, transparent)`, transformOrigin: "center", borderRadius: 2 }}
      />
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: isActive ? project.accentColor : "var(--text-3)", letterSpacing: "0.12em", minWidth: 28, flexShrink: 0, paddingLeft: isActive ? 14 : 2, transition: "color 0.25s, padding-left 0.28s cubic-bezier(0.22,1,0.36,1)" }}>
        {project.num}
      </span>
      <div style={{ flex: 1, height: 1, margin: "0 14px", background: isActive ? `linear-gradient(to right, ${project.accentColor}50, transparent)` : "var(--border)", transition: "background 0.3s" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", letterSpacing: "-0.02em", color: isActive ? "var(--text)" : "var(--text-2)", transition: "color 0.25s", whiteSpace: "nowrap" }}>
          {project.title}
        </span>
        <div style={{ display: "flex", gap: 4 }}>
          {project.tags.map(t => (
            <span key={t} style={{ fontSize: 7.5, padding: "2px 6px", borderRadius: 99, border: `1px solid ${isActive ? project.accentColor + "50" : "var(--border)"}`, color: isActive ? project.accentColor : "var(--text-3)", fontFamily: "var(--font-mono)", letterSpacing: "0.06em", textTransform: "uppercase", transition: "color 0.25s, border-color 0.25s" }}>{t}</span>
          ))}
        </div>
      </div>
      <motion.div animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }} transition={{ duration: 0.22 }}
        style={{ marginLeft: 12, color: project.accentColor, flexShrink: 0 }}>
        <IconArrow />
      </motion.div>
    </motion.div>
  );
}

// ── Mobile card ───────────────────────────────────────────────────────
function MobileCard({ project, delay }: { project: typeof projects[number]; delay: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.article ref={ref}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden", background: "var(--surface)", transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s" }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${project.accentColor}45`; el.style.transform = "translateY(-3px)"; el.style.boxShadow = "0 14px 40px rgba(0,0,0,0.4)"; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
    >
      <div style={{ height: 160, background: "var(--surface)", position: "relative", overflow: "hidden" }}>
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image} alt={project.title} style={{ width: "100%", height: 160, objectFit: "cover", objectPosition: "top", display: "block" }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
        ) : (
          <div style={{ width: "100%", height: 160, background: `linear-gradient(135deg, ${project.gradFrom}, ${project.gradTo})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 800, fontSize: 60, color: project.accentColor, opacity: 0.18, letterSpacing: "-0.05em" }}>{project.num}</span>
          </div>
        )}
        <div style={{ position: "absolute", bottom: 10, left: 14, display: "flex", gap: 5, flexWrap: "wrap" }}>
          {project.tags.map(t => (
            <span key={t} style={{ fontSize: 7.5, padding: "3px 8px", borderRadius: 99, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", border: `1px solid ${project.accentColor}40`, color: project.accentColor, fontFamily: "var(--font-mono)", letterSpacing: "0.09em", textTransform: "uppercase" }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: "18px 20px 20px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: project.accentColor, letterSpacing: "0.14em", display: "block", marginBottom: 6 }}>{project.num}</span>
        <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.03em", color: "var(--text)", marginBottom: 8, lineHeight: 1.2 }}>{project.title}</h3>
        <p style={{ fontSize: 12.5, lineHeight: 1.75, color: "var(--text-2)", marginBottom: 14 }}>{project.description}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
          {project.stack.map(s => (
            <span key={s} style={{ fontSize: 8.5, padding: "3px 8px", borderRadius: 4, border: "1px solid var(--border-2)", color: "var(--text-3)", fontFamily: "var(--font-mono)", letterSpacing: "0.03em", background: "var(--bg)" }}>{s}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
          {project.live !== "#" && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flex: 1, justifyContent: "center", fontSize: 11, padding: "9px 16px", display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}>View Live <IconExternal /></a>
          )}
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ flex: project.live !== "#" ? "0 0 auto" : 1, justifyContent: "center", fontSize: 11, padding: "9px 18px", display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
            <IconGitHub /> GitHub
          </a>
        </div>
      </div>
    </motion.article>
  );
}

// ── Main ──────────────────────────────────────────────────────────────
export default function Projects() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); setActive(a => (a + 1) % projects.length); }
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); setActive(a => (a - 1 + projects.length) % projects.length); }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) window.addEventListener("keydown", handleKey);
      else window.removeEventListener("keydown", handleKey);
    }, { threshold: 0.3 });
    observer.observe(section);
    return () => { observer.disconnect(); window.removeEventListener("keydown", handleKey); };
  }, [handleKey]);

  return (
    <section id="work" ref={sectionRef}>
      <div className="h-rule" />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(80px,10vw,140px) clamp(24px,4vw,48px)" }}>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "clamp(40px,6vw,72px)", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p className="label" style={{ marginBottom: 10 }}>03 — Selected Work</p>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.04em", lineHeight: 1, color: "var(--text)", margin: 0 }}>
              Things I&apos;ve<span style={{ color: "var(--accent)" }}> built.</span>
            </h2>
          </div>
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="link" style={{ fontSize: 11 }}>View all on GitHub ↗</a>
        </motion.div>

        {/* Desktop split */}
        <div className="projects-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 72px)", alignItems: "start" }}>
          <div>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: 1, background: "var(--border)", transformOrigin: "left" }} />
            {projects.map((project, i) => (
              <ProjectRow key={project.num} project={project} isActive={active === i}
                onHover={() => setActive(i)} onClick={() => setActive(i)} delay={0.05 + i * 0.06} />
            ))}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 20, gap: 12 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--text-3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>↑ ↓ or click to navigate</span>
              <div style={{ display: "flex", gap: 6 }}>
                {[
                  { dir: -1, pts: "15 18 9 12 15 6" },
                  { dir: +1, pts: "9 18 15 12 9 6" },
                ].map(({ dir, pts }) => (
                  <button key={dir} onClick={() => setActive(a => (a + dir + projects.length) % projects.length)}
                    aria-label={dir < 0 ? "Previous project" : "Next project"}
                    style={{ width: 28, height: 28, borderRadius: 5, border: "1px solid var(--border-2)", background: "transparent", color: "var(--text-3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s, color 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--text-2)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-2)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-3)"; }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points={pts} /></svg>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ position: "sticky", top: 90 }}>
            <AnimatePresence mode="wait">
              <ProjectPreview key={active} project={projects[active]} index={active} total={projects.length} />
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Mobile */}
        <div className="projects-mobile-grid" style={{ display: "none", gridTemplateColumns: "1fr", gap: 14 }}>
          {projects.map((p, i) => <MobileCard key={p.num} project={p} delay={0.04 + i * 0.06} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .projects-split { display: none !important; }
          .projects-mobile-grid { display: grid !important; }
        }
        @media (min-width: 500px) and (max-width: 820px) {
          .projects-mobile-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}

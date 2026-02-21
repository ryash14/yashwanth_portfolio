"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { useToast } from "@/components/Toast";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

const INFO_ROWS = [
  { label: "Email",         value: siteConfig.email,    href: `mailto:${siteConfig.email}`, mono: true  },
  { label: "Response",      value: "Within 24 hours",   href: null,                          mono: false },
  { label: "Timezone",      value: "IST — UTC +5:30",   href: null,                          mono: true  },
  { label: "Location",      value: siteConfig.location, href: null,                          mono: false },
] as const;

const SOCIAL_LINKS = [
  { label: "GitHub",   href: siteConfig.github,              desc: "github.com/ryash14"       },
  { label: "LinkedIn", href: siteConfig.linkedin,            desc: "linkedin.com/in/yashredd" },
  { label: "Resume",   href: siteConfig.resume,              desc: "View PDF"                 },
];

export default function Contact() {
  const [form,       setForm]       = useState({ name: "", email: "", message: "" });
  const [status,     setStatus]     = useState<"idle" | "sending" | "sent">("idle");
  const [copied,     setCopied]     = useState(false);
  const [senderName, setSenderName] = useState("");
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return;
    setStatus("sending");
    setSenderName(form.name.split(" ")[0]);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      const data = await res.json();
      if (data.reason === "not_configured") {
        setStatus("idle");
        addToast("warning", "Email not configured", "Set GMAIL_USER + GMAIL_APP_PASSWORD in .env.local");
        return;
      }
      if (!data.ok) throw new Error("send_failed");
    } catch {
      setStatus("idle");
      addToast("error", "Failed to send", "Something went wrong — try emailing directly.");
      return;
    }
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
    addToast("success", "Message sent!", "Thanks — I'll reply within 24 hours.");
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    addToast("info", "Copied to clipboard", siteConfig.email);
    setTimeout(() => setCopied(false), 2000);
  };

  const fieldStyle = {
    width: "100%",
    padding: "13px 14px",
    background: "var(--bg)",
    border: "1px solid var(--border-2)",
    color: "var(--text)",
    fontSize: 13,
    borderRadius: 4,
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  } as React.CSSProperties;

  return (
    <section id="contact">
      <div className="h-rule" />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(80px,10vw,140px) clamp(24px,4vw,48px)" }}>

        {/* Section label */}
        <Reveal>
          <p className="label" style={{ marginBottom: "clamp(36px,5vw,52px)" }}>06 — Contact</p>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.04}>
          <div style={{ marginBottom: "clamp(52px,7vw,80px)" }}>
            <h2 style={{
              fontFamily: "var(--font-grotesk)", fontWeight: 700,
              fontSize: "clamp(2.4rem, 6vw, 6.5rem)",
              letterSpacing: "-0.04em", lineHeight: 0.95,
              color: "var(--text)", margin: 0,
            }}>
              Let&apos;s work<br />
              <span style={{ color: "var(--text-2)" }}>together.</span>
            </h2>
          </div>
        </Reveal>

        {/* ── Content grid ── */}
        <div className="contact-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "clamp(48px,8vw,100px)" }}>

          {/* ── Left: info ── */}
          <Reveal delay={0.08}>
            <div>

              {/* Availability badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "7px 12px",
                border: "1px solid var(--accent-border)",
                borderRadius: 3,
                background: "var(--accent-bg)",
                marginBottom: "clamp(28px,4vw,40px)",
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "var(--accent)",
                  boxShadow: "0 0 6px var(--accent-glow-lg)",
                  flexShrink: 0, display: "inline-block",
                  animation: "pulse-dot 2s infinite",
                }} />
                <span style={{
                  fontSize: 9, color: "var(--accent)", fontFamily: "var(--font-mono)",
                  letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600,
                }}>
                  Available for new roles
                </span>
              </div>

              {/* Info table */}
              <div style={{ borderTop: "1px solid var(--border-2)", marginBottom: "clamp(28px,4vw,40px)" }}>
                {INFO_ROWS.map(({ label, value, href, mono }) => (
                  <div key={label} className="contact-info-row" style={{
                    display: "grid", gridTemplateColumns: "80px 1fr auto",
                    gap: 16, padding: "12px 0",
                    borderBottom: "1px solid var(--border)",
                    alignItems: "center",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: 8,
                      color: "var(--text-3)", letterSpacing: "0.16em",
                      textTransform: "uppercase",
                    }}>
                      {label}
                    </span>
                    {href ? (
                      <a href={href} style={{
                        fontSize: 12, color: "var(--text-2)",
                        fontFamily: mono ? "var(--font-mono)" : "var(--font-grotesk)",
                        textDecoration: "none", transition: "color 0.2s",
                        letterSpacing: mono ? "0.03em" : "normal",
                      }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}>
                        {value}
                      </a>
                    ) : (
                      <span style={{
                        fontSize: 12, color: "var(--text-2)",
                        fontFamily: mono ? "var(--font-mono)" : "var(--font-grotesk)",
                        letterSpacing: mono ? "0.03em" : "normal",
                      }}>
                        {value}
                      </span>
                    )}
                    {label === "Email" && (
                      <motion.button
                        onClick={copyEmail}
                        initial={false}
                        animate={{ scale: copied ? 1.1 : 1 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          display: "flex", alignItems: "center", gap: 4,
                          border: "none", background: "transparent",
                          color: "var(--text-3)", cursor: "pointer",
                          fontSize: 10, fontFamily: "var(--font-mono)",
                          letterSpacing: "0.04em", padding: "4px 0",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)"}
                        onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "var(--text-3)"}
                      >
                        {copied ? "✓ Copied" : "Copy"}
                      </motion.button>
                    )}
                  </div>
                ))}
              </div>

              {/* Social / profile links */}
              <div>
                <p style={{
                  fontFamily: "var(--font-mono)", fontSize: 8,
                  color: "var(--text-3)", letterSpacing: "0.18em",
                  textTransform: "uppercase", marginBottom: 12,
                }}>
                  Profiles
                </p>
                <div style={{ borderTop: "1px solid var(--border-2)" }}>
                  {SOCIAL_LINKS.map(({ label, href, desc }) => (
                    <a key={label} href={href}
                      target={href === "#" ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom: "1px solid var(--border)",
                        textDecoration: "none",
                        color: "var(--text-2)",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "var(--text)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-2)";
                      }}>
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: 11,
                        letterSpacing: "0.04em",
                      }}>
                        {label}
                      </span>
                      <span style={{
                        fontSize: 9, color: "var(--text-3)",
                        fontFamily: "var(--font-mono)", letterSpacing: "0.03em",
                      }}>
                        {desc} ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </Reveal>

          {/* ── Right: form / success ── */}
          <Reveal delay={0.12}>
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                /* ── Beautiful success panel ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    textAlign: "center",
                    minHeight: 380,
                    padding: "clamp(32px,6vw,60px) clamp(20px,4vw,40px)",
                    border: "1px solid var(--accent-border)",
                    borderRadius: 12,
                    background: "var(--accent-bg)",
                    position: "relative", overflow: "hidden",
                  }}
                >
                  {/* Radial glow */}
                  <div style={{
                    position: "absolute", top: -60, right: -60,
                    width: 220, height: 220, borderRadius: "50%",
                    background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }} />

                  {/* Animated check circle */}
                  <motion.div
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      width: 72, height: 72, borderRadius: "50%",
                      background: "var(--accent)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 28,
                      boxShadow: "0 0 0 12px var(--accent-bg), 0 0 0 14px var(--accent-border)",
                    }}
                  >
                    <motion.svg
                      width="28" height="28" viewBox="0 0 24 24" fill="none"
                      stroke="var(--btn-primary-text)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.45, duration: 0.45, ease: "easeOut" }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </motion.svg>
                  </motion.div>

                  {/* Heading */}
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.45 }}
                    style={{
                      fontFamily: "var(--font-grotesk)", fontWeight: 800,
                      fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                      letterSpacing: "-0.035em", lineHeight: 1.15,
                      color: "var(--text)", margin: "0 0 12px",
                    }}
                  >
                    Got it, {senderName}!
                  </motion.h3>

                  {/* Subtext */}
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.45 }}
                    style={{
                      fontSize: 13.5, lineHeight: 1.8,
                      color: "var(--text-2)",
                      maxWidth: 320, margin: "0 0 28px",
                    }}
                  >
                    Your message is in my inbox. I read every one and reply within 24 hours.
                  </motion.p>

                  {/* Detail row */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55, duration: 0.4 }}
                    style={{
                      display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center",
                      marginBottom: 36,
                    }}
                  >
                    {[
                      {
                        label: "Message received",
                        icon: (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                            <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
                          </svg>
                        ),
                      },
                      {
                        label: "Reply within 24h",
                        icon: (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        ),
                      },
                      {
                        label: "Private & secure",
                        icon: (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          </svg>
                        ),
                      },
                    ].map(({ icon, label }) => (
                      <span key={label} style={{
                        display: "flex", alignItems: "center", gap: 6,
                        fontSize: 11, color: "var(--text-3)",
                        fontFamily: "var(--font-mono)", letterSpacing: "0.03em",
                      }}>
                        {icon}
                        {label}
                      </span>
                    ))}
                  </motion.div>

                  {/* Send another */}
                  <motion.button
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.4 }}
                    onClick={() => setStatus("idle")}
                    style={{
                      padding: "9px 22px",
                      border: "1px solid var(--accent-border)",
                      borderRadius: 6, background: "transparent",
                      color: "var(--accent)", fontSize: 11,
                      fontFamily: "var(--font-mono)", letterSpacing: "0.06em",
                      textTransform: "uppercase", cursor: "pointer",
                      transition: "background 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = "var(--accent-bg-mid)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent-border-hover)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent-border)";
                    }}
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              ) : (
                /* ── Normal form ── */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >

                  {/* Name + Email row */}
                  <div className="contact-name-email-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    {(["name", "email"] as const).map(field => (
                      <div key={field}>
                        <label style={{
                          display: "block", fontSize: 9, letterSpacing: "0.15em",
                          textTransform: "uppercase", color: "var(--text-3)", marginBottom: 8,
                          fontFamily: "var(--font-mono)",
                        }}>
                          {field === "name" ? "Your name" : "Email address"}
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          value={form[field]}
                          onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                          placeholder={field === "email" ? "you@email.com" : "Full name"}
                          required
                          style={fieldStyle}
                          onFocus={e => (e.currentTarget.style.borderColor = "var(--text-2)")}
                          onBlur={e => (e.currentTarget.style.borderColor = "var(--border-2)")}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{
                      display: "block", fontSize: 9, letterSpacing: "0.15em",
                      textTransform: "uppercase", color: "var(--text-3)", marginBottom: 8,
                      fontFamily: "var(--font-mono)",
                    }}>
                      Message
                    </label>
                    <textarea
                      rows={6}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell me about the opportunity or project..."
                      required
                      style={{ ...fieldStyle, resize: "none" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "var(--text-2)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "var(--border-2)")}
                    />
                  </div>

                  {/* Note */}
                  <p style={{
                    fontSize: 10, color: "var(--text-3)", fontFamily: "var(--font-mono)",
                    letterSpacing: "0.04em", marginTop: -8,
                  }}>
                    I read every message and reply within 24 hours.
                  </p>

                  {/* Submit */}
                  <button type="submit" disabled={status !== "idle"}
                    className="btn-primary"
                    style={{
                      width: "100%", justifyContent: "center",
                      padding: "14px 28px", fontSize: 12,
                      opacity: status !== "idle" ? 0.7 : 1,
                      transition: "opacity 0.2s",
                    }}>
                    <AnimatePresence mode="wait">
                      {status === "idle" && (
                        <motion.span key="idle"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          Send Message
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22,2 15,22 11,13 2,9" />
                          </svg>
                        </motion.span>
                      )}
                      {status === "sending" && (
                        <motion.span key="sending"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <motion.span style={{
                            width: 13, height: 13, borderRadius: "50%",
                            border: "2px solid currentColor", borderTopColor: "transparent",
                            display: "inline-block",
                          }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          />
                          Sending…
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>

                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .contact-name-email-row { grid-template-columns: 1fr !important; }
          .contact-info-row {
            grid-template-columns: 68px 1fr !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}

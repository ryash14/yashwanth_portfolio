"use client";
import { createContext, useContext, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ──────────────────────────────────────────────────────────────
type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastCtx {
  addToast: (type: ToastType, title: string, message?: string) => void;
}

// ── Context ────────────────────────────────────────────────────────────
const ToastContext = createContext<ToastCtx>({ addToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

// ── Icon per type ───────────────────────────────────────────────────────
const ICONS: Record<ToastType, React.ReactNode> = {
  success: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  ),
  error: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  info: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  warning: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
};

const ACCENT: Record<ToastType, string> = {
  success: "#22c55e",
  error:   "#ef4444",
  info:    "var(--accent)",
  warning: "#f59e0b",
};

// ── Single toast item ──────────────────────────────────────────────────
function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const accent = ACCENT[toast.type];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex", alignItems: "flex-start", gap: 12,
        padding: "14px 16px",
        background: "var(--surface)",
        border: `1px solid var(--border-2)`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: 10,
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        minWidth: 280, maxWidth: 360,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
      onClick={() => onDismiss(toast.id)}
    >
      {/* Progress bar */}
      <motion.div
        initial={{ scaleX: 1, originX: 0 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 4, ease: "linear" }}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 2, background: accent, opacity: 0.4,
        }}
      />

      {/* Icon */}
      <div style={{
        width: 28, height: 28, borderRadius: 7, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: `${accent}18`, color: accent,
        marginTop: 1,
      }}>
        {ICONS[toast.type]}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          margin: 0, fontSize: 13, fontWeight: 600,
          color: "var(--text)", fontFamily: "var(--font-grotesk)",
          letterSpacing: "-0.01em",
        }}>
          {toast.title}
        </p>
        {toast.message && (
          <p style={{
            margin: "3px 0 0", fontSize: 11.5,
            color: "var(--text-3)", lineHeight: 1.5,
            fontFamily: "var(--font-grotesk)",
          }}>
            {toast.message}
          </p>
        )}
      </div>

      {/* Close hit zone */}
      <div style={{ color: "var(--text-3)", fontSize: 10, marginTop: 2, flexShrink: 0 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
    </motion.div>
  );
}

// ── Provider ───────────────────────────────────────────────────────────
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timerRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    if (timerRef.current.has(id)) {
      clearTimeout(timerRef.current.get(id)!);
      timerRef.current.delete(id);
    }
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    setToasts(prev => [...prev.slice(-3), { id, type, title, message }]);
    const timer = setTimeout(() => dismiss(id), 4200);
    timerRef.current.set(id, timer);
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast stack */}
      <div style={{
        position: "fixed", bottom: 28, left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex", flexDirection: "column", gap: 10,
        alignItems: "center",
        pointerEvents: "none",
      }}>
        <AnimatePresence mode="popLayout">
          {toasts.map(toast => (
            <div key={toast.id} style={{ pointerEvents: "auto" }}>
              <ToastItem toast={toast} onDismiss={dismiss} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

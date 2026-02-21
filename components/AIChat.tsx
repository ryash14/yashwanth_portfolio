"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/data";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  streaming?: boolean;
}

const SUGGESTIONS = [
  "Who is Yashwanth?",
  "Tech stack?",
  "Tell me about projects",
  "Work experience?",
  "How to contact him?",
];

// ── Bot icon — clear robot face ──────────────────────────────────────
function BotIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* Antenna */}
      <line x1="12" y1="2" x2="12" y2="5" />
      <circle cx="12" cy="2" r="0.8" fill="currentColor" stroke="none" />
      {/* Head */}
      <rect x="3" y="5" width="18" height="14" rx="3" />
      {/* Eyes */}
      <circle cx="8.5" cy="11.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="11.5" r="1.5" fill="currentColor" stroke="none" />
      {/* Mouth / signal line */}
      <path d="M8.5 15.5h2.5a.5.5 0 010 1H8.5a.5.5 0 010-1z" fill="currentColor" stroke="none" />
      <path d="M13 15.5h2a.5.5 0 010 1h-2a.5.5 0 010-1z" fill="currentColor" stroke="none" />
      {/* Side connectors */}
      <line x1="1" y1="11" x2="3" y2="11" />
      <line x1="21" y1="11" x2="23" y2="11" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ── Message renderer ──────────────────────────────────────────────────
function MsgContent({ text, streaming }: { text: string; streaming?: boolean }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, li) => {
        const isBullet = line.startsWith("→ ");
        const isNumbered = /^\d+\.\s/.test(line);
        const content = isBullet ? line.slice(2) : isNumbered ? line : line;

        // Parse **bold** within the line
        const parseBold = (str: string) => {
          const parts = str.split(/(\*\*[^*]+\*\*)/g);
          return parts.map((p, pi) =>
            p.startsWith("**") ? (
              <strong key={pi} style={{ fontWeight: 600, color: "inherit" }}>
                {p.slice(2, -2)}
              </strong>
            ) : p
          );
        };

        const el = isBullet ? (
          <span key={li} style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
            <span style={{ color: "var(--accent)", flexShrink: 0, fontSize: "0.85em", marginTop: 1 }}>→</span>
            <span>{parseBold(content)}</span>
          </span>
        ) : (
          <span key={li}>{parseBold(content)}</span>
        );

        return (
          <span key={li}>
            {isBullet || isNumbered
              ? <span style={{ display: "block", marginTop: li > 0 ? 4 : 0 }}>{el}</span>
              : el
            }
            {!isBullet && !isNumbered && li < lines.length - 1 && <br />}
          </span>
        );
      })}
      {streaming && (
        <span style={{
          display: "inline-block", width: 2, height: "0.85em",
          background: "var(--accent)", marginLeft: 2,
          animation: "blink-cursor 0.7s step-end infinite",
          verticalAlign: "text-bottom", borderRadius: 1,
        }} />
      )}
    </>
  );
}

// ── Tic-Tac-Toe mini game ─────────────────────────────────────────────
type Cell = "X" | "O" | null;
const WIN_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function getWinner(b: Cell[]): Cell | "draw" | null {
  for (const [a, c, d] of WIN_LINES) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  }
  if (b.every(c => c !== null)) return "draw";
  return null;
}

function minimax(board: Cell[], isMax: boolean): number {
  const w = getWinner(board);
  if (w === "O") return 10;
  if (w === "X") return -10;
  if (w === "draw") return 0;
  const scores: number[] = [];
  board.forEach((cell, i) => {
    if (!cell) {
      board[i] = isMax ? "O" : "X";
      scores.push(minimax(board, !isMax));
      board[i] = null;
    }
  });
  return isMax ? Math.max(...scores) : Math.min(...scores);
}

function getBotMove(board: Cell[]): number {
  let best = -Infinity, move = -1;
  board.forEach((cell, i) => {
    if (!cell) {
      board[i] = "O";
      const s = minimax(board, false);
      board[i] = null;
      if (s > best) { best = s; move = i; }
    }
  });
  return move;
}

function TicTacToe({ isAnswerReady, onReveal }: { isAnswerReady: boolean; onReveal: () => void }) {
  const [board, setBoard]       = useState<Cell[]>(Array(9).fill(null));
  const [status, setStatus]     = useState<string>("");
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (i: number) => {
    if (board[i] || gameOver) return;
    const next = [...board];
    next[i] = "X";
    const w = getWinner(next);
    if (w) { setBoard(next); endGame(next, w); return; }
    const botI = getBotMove(next);
    if (botI !== -1) next[botI] = "O";
    const w2 = getWinner(next);
    setBoard(next);
    if (w2) endGame(next, w2);
  };

  const endGame = (b: Cell[], result: Cell | "draw") => {
    setGameOver(true);
    if (result === "X") {
      setStatus("You won! Answer unlocked!");
      setTimeout(() => onReveal(), 900);
    } else {
      setStatus(result === "draw" ? "Draw! Try again..." : "Bot wins! Try again...");
      setTimeout(() => {
        setBoard(Array(9).fill(null));
        setStatus("");
        setGameOver(false);
      }, 1400);
    }
  };

  const winner = getWinner(board);
  const winLine = WIN_LINES.find(([a, c, d]) => board[a] && board[a] === board[c] && board[a] === board[d]);

  return (
    <div style={{ padding: "10px 12px 10px" }}>
      {/* Status / unlock banner */}
      <div style={{ marginBottom: 8, minHeight: 28 }}>
        {status ? (
          <motion.div key={status} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "var(--font-mono)", fontSize: 8.5, color: "var(--accent)", letterSpacing: "0.08em" }}>
            {status}
          </motion.div>
        ) : isAnswerReady ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            style={{
              background: "var(--accent-dim)", border: "1px solid var(--accent-border)",
              borderRadius: 6, padding: "5px 9px",
              display: "flex", alignItems: "center", gap: 6,
            }}>
            <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--accent)", letterSpacing: "0.06em" }}>
              Answer ready — beat the bot to unlock instantly
            </span>
          </motion.div>
        ) : (
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 8.5, color: "var(--text-3)", letterSpacing: "0.08em" }}>
            Play while thinking
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }}>...</motion.span>
          </div>
        )}
      </div>

      {/* Board */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4, width: 126 }}>
        {board.map((cell, i) => {
          const isWin = winLine?.includes(i) && !!winner && winner !== "draw";
          return (
            <motion.button
              key={i}
              onClick={() => handleClick(i)}
              whileTap={!cell && !gameOver ? { scale: 0.88 } : {}}
              style={{
                width: 38, height: 38,
                border: `1px solid ${isWin ? "var(--accent)" : "var(--border-2)"}`,
                borderRadius: 6,
                background: isWin ? "var(--accent-dim)" : cell ? "var(--surface)" : "var(--bg)",
                color: cell === "X" ? "var(--accent)" : cell === "O" ? "var(--text-2)" : "transparent",
                fontSize: 15, fontWeight: 700, fontFamily: "var(--font-grotesk)",
                cursor: cell || gameOver ? "default" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              {cell && (
                <motion.span initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}>
                  {cell}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Footer row */}
      <div style={{ marginTop: 7, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 7.5, color: "var(--text-3)", letterSpacing: "0.06em" }}>
          You = X · Bot = O (unbeatable)
        </div>
        {isAnswerReady && !gameOver && (
          <motion.button
            initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}
            onClick={onReveal}
            style={{
              background: "transparent", border: "none",
              fontFamily: "var(--font-mono)", fontSize: 7.5,
              color: "var(--text-3)", cursor: "pointer",
              letterSpacing: "0.06em", padding: "2px 0",
              textDecoration: "underline", textUnderlineOffset: 2,
            }}
          >
            skip →
          </motion.button>
        )}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────
export default function AIChat() {
  const [open, setOpen]             = useState(false);
  const [messages, setMessages]     = useState<Message[]>([]);
  const [input, setInput]           = useState("");
  const [busy, setBusy]             = useState(false);
  const [pendingAnswer, setPendingAnswer] = useState<string | null>(null);
  const bottomRef                   = useRef<HTMLDivElement>(null);
  const inputRef                    = useRef<HTMLTextAreaElement>(null);
  const abortRef                    = useRef(false);

  const revealAnswer = useCallback(() => {
    if (!pendingAnswer) return;
    const answer = pendingAnswer;
    setPendingAnswer(null);
    setMessages(msgs => [...msgs, {
      id: "a-" + Date.now(),
      role: "ai" as const,
      content: answer,
      streaming: false,
    }]);
  }, [pendingAnswer]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        id: "welcome",
        role: "ai",
        content: `Hi, I am an AI built to answer questions about **${siteConfig.name}**.\n\nAsk about skills, projects, experience, or how to get in touch.`,
      }]);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = useCallback(async (text: string) => {
    if (!text.trim() || busy || !!pendingAnswer) return;

    abortRef.current = false;
    setBusy(true);

    const userMsg: Message = {
      id: "u-" + Date.now(),
      role: "user",
      content: text.trim(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Response goes to pendingAnswer — revealed when game ends or skipped
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim() }),
      });
      const data = await res.json();
      const content = data.error
        ? data.error
        : (data.response ?? "I could not get a response. Please try again.");
      setPendingAnswer(content);
    } catch {
      setPendingAnswer("Could not reach the AI. Please try again.");
    }

    setBusy(false);
  }, [busy, pendingAnswer]);

  return (
    <>
      {/* ── Floating trigger ── */}
      <motion.button
        initial={{ opacity: 0, scale: 0.7, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close AI chat" : "Ask AI about me"}
        style={{
          position: "fixed", bottom: 28, right: "clamp(8px,2.5vw,28px)", zIndex: 300,
          width: 48, height: 48,
          background: open ? "var(--surface)" : "var(--accent)",
          border: open ? "1px solid var(--border-2)" : "none",
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          color: open ? "var(--text-2)" : "var(--btn-primary-text)",
          boxShadow: open
            ? "0 4px 20px rgba(0,0,0,0.5)"
            : "0 8px 32px rgba(137,196,174,0.4), 0 2px 8px rgba(0,0,0,0.35)",
          transition: "background 0.3s, box-shadow 0.3s, color 0.3s, border 0.3s",
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.2 }}>
              <CloseIcon />
            </motion.div>
          ) : (
            <motion.div key="bot"
              initial={{ opacity: 0, scale: 0.6, rotate: 20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: -20 }}
              transition={{ duration: 0.2 }}>
              <BotIcon size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", bottom: 94, right: "clamp(8px,2.5vw,28px)", zIndex: 299,
              width: "min(420px, calc(100vw - 16px))",
              background: "var(--bg)",
              border: "1px solid var(--border-2)",
              borderRadius: 20,
              boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(137,196,174,0.05)",
              overflow: "hidden",
              display: "flex", flexDirection: "column",
              maxHeight: "min(600px, 82vh)",
            }}
          >
            {/* ── Header ── */}
            <div style={{
              padding: "14px 16px",
              background: "linear-gradient(135deg, var(--surface) 0%, rgba(137,196,174,0.04) 100%)",
              borderBottom: "1px solid var(--border)",
              display: "flex", alignItems: "center", gap: 11,
              flexShrink: 0,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 11,
                background: "var(--accent)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--btn-primary-text)", flexShrink: 0,
                boxShadow: "0 2px 12px rgba(137,196,174,0.35)",
              }}>
                <BotIcon size={17} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  margin: 0, fontSize: 13, fontWeight: 700,
                  color: "var(--text)", fontFamily: "var(--font-grotesk)",
                  letterSpacing: "-0.02em",
                }}>
                  AI · Yashwanth&apos;s Portfolio
                </p>
                <p style={{
                  margin: "2px 0 0", fontSize: 9.5,
                  color: "var(--text-3)", fontFamily: "var(--font-mono)",
                  letterSpacing: "0.04em",
                  display: "flex", alignItems: "center", gap: 5,
                }}>
                  <span style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: "var(--accent)", display: "inline-block",
                    animation: "pulse-dot 2s infinite",
                  }} />
                  Powered by Gemini · Portfolio assistant only
                </p>
              </div>
              <button
                onClick={() => { setMessages([]); setPendingAnswer(null); abortRef.current = true; setBusy(false); }}
                title="Clear chat"
                style={{
                  background: "transparent", border: "1px solid var(--border)",
                  color: "var(--text-3)", cursor: "pointer",
                  fontSize: 8.5, fontFamily: "var(--font-mono)",
                  letterSpacing: "0.07em", textTransform: "uppercase",
                  padding: "4px 8px", borderRadius: 5,
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-2)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-2)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-3)";
                }}
              >
                clear
              </button>
            </div>

            {/* ── Messages ── */}
            <div style={{
              flex: 1, overflowY: "auto",
              padding: "16px 14px 10px",
              display: "flex", flexDirection: "column", gap: 14,
              scrollbarWidth: "thin",
              scrollbarColor: "var(--border) transparent",
            }}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    gap: 9, alignItems: "flex-end",
                  }}
                >
                  {msg.role === "ai" && (
                    <div style={{
                      width: 24, height: 24, borderRadius: 7,
                      background: "var(--accent)", color: "var(--btn-primary-text)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <BotIcon size={12} />
                    </div>
                  )}
                  <div style={{
                    maxWidth: msg.role === "user" ? "78%" : "84%",
                    padding: msg.role === "user" ? "9px 14px" : "11px 14px",
                    borderRadius: msg.role === "user"
                      ? "14px 14px 3px 14px"
                      : "4px 14px 14px 14px",
                    fontSize: 12.5,
                    lineHeight: 1.7,
                    background: msg.role === "user"
                      ? "var(--accent)"
                      : "var(--surface)",
                    color: msg.role === "user" ? "var(--btn-primary-text)" : "var(--text-2)",
                    border: msg.role === "ai" ? "1px solid var(--border)" : "none",
                    borderLeft: msg.role === "ai"
                      ? "2px solid rgba(137,196,174,0.3)"
                      : undefined,
                    fontFamily: msg.role === "user" ? "var(--font-grotesk)" : undefined,
                    fontWeight: msg.role === "user" ? 500 : 400,
                  }}>
                    <MsgContent text={msg.content || " "} streaming={msg.streaming} />
                  </div>
                </motion.div>
              ))}

              {/* AI Thinking — TicTacToe game */}
              <AnimatePresence>
              {(busy || !!pendingAnswer) && messages.length > 0 && messages[messages.length - 1].role === "user" && (
                <motion.div
                  key="ttt-thinking"
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "flex", alignItems: "flex-start", gap: 9 }}
                >
                  <motion.div
                    animate={{ boxShadow: ["0 0 0px rgba(79,158,255,0)", "0 0 12px rgba(79,158,255,0.5)", "0 0 0px rgba(79,158,255,0)"] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: 24, height: 24, borderRadius: 7, background: "var(--accent)", color: "var(--btn-primary-text)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 10 }}
                  >
                    <BotIcon size={12} />
                  </motion.div>
                  <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderLeft: "2px solid var(--accent-border)", borderRadius: "4px 14px 14px 14px" }}>
                    <TicTacToe isAnswerReady={!!pendingAnswer} onReveal={revealAnswer} />
                  </div>
                </motion.div>
              )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* ── Suggestions ── */}
            {messages.length <= 1 && !busy && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  padding: "6px 12px 10px",
                  display: "flex", flexWrap: "wrap", gap: 5,
                  borderTop: "1px solid var(--border)",
                  background: "var(--surface)",
                  flexShrink: 0,
                }}
              >
                <p style={{
                  width: "100%", fontSize: 8.5, color: "var(--text-3)",
                  fontFamily: "var(--font-mono)", letterSpacing: "0.1em",
                  textTransform: "uppercase", marginBottom: 5, marginTop: 2,
                }}>
                  Suggested
                </p>
                {SUGGESTIONS.map(sg => (
                  <button
                    key={sg}
                    onClick={() => send(sg)}
                    style={{
                      padding: "5px 10px",
                      background: "var(--bg)",
                      border: "1px solid var(--border-2)",
                      borderRadius: 99,
                      fontSize: 10.5, color: "var(--text-2)",
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.02em", cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(137,196,174,0.06)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-2)";
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--text-2)";
                      (e.currentTarget as HTMLButtonElement).style.background = "var(--bg)";
                    }}
                  >
                    {sg}
                  </button>
                ))}
              </motion.div>
            )}

            {/* ── Input ── */}
            <div style={{
              padding: "10px 12px",
              borderTop: "1px solid var(--border)",
              background: "var(--surface)",
              display: "flex", gap: 8, alignItems: "flex-end",
              flexShrink: 0,
            }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask anything about Yashwanth…"
                rows={1}
                disabled={busy || !!pendingAnswer}
                style={{
                  flex: 1, border: "1px solid var(--border-2)",
                  borderRadius: 10,
                  background: "var(--bg)",
                  color: "var(--text)",
                  fontSize: 12.5, fontFamily: "inherit",
                  outline: "none", resize: "none",
                  padding: "9px 12px",
                  maxHeight: 90,
                  transition: "border-color 0.2s",
                  lineHeight: 1.5,
                  opacity: busy || !!pendingAnswer ? 0.5 : 1,
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--accent)")}
                onBlur={e => (e.currentTarget.style.borderColor = "var(--border-2)")}
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || busy || !!pendingAnswer}
                style={{
                  width: 36, height: 36,
                  background: input.trim() && !busy && !pendingAnswer ? "var(--accent)" : "var(--border)",
                  border: "none", borderRadius: 10,
                  color: input.trim() && !busy && !pendingAnswer ? "#080808" : "var(--text-3)",
                  cursor: input.trim() && !busy && !pendingAnswer ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, transition: "background 0.2s, color 0.2s, transform 0.15s",
                  transform: input.trim() && !busy && !pendingAnswer ? "scale(1)" : "scale(0.93)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </>
  );
}

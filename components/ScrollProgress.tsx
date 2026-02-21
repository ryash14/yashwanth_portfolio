"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 250,
        height: 3,
        background: "transparent",
        pointerEvents: "none",
      }}
    >
      <motion.div
        animate={{ width: `${progress}%` }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
        style={{
          height: "100%",
          background: `linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 100%)`,
          boxShadow: "0 0 20px var(--accent-glow-md)",
        }}
      />
      <style>{`
        @media (max-width: 768px) {
          .scroll-progress-bar { display: none !important; }
        }
      `}</style>
    </motion.div>
  );
}

import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a portfolio assistant for Yashwanth Reddy Reddygari. Your ONLY purpose is to answer questions about Yashwanth based on the information below. If someone asks about anything unrelated to Yashwanth, politely redirect them.

IMPORTANT: Always give complete, detailed, and thorough answers. Never cut answers short or give half-answers. When asked about multiple topics (experience, projects, skills, contact, personal life), address ALL of them fully. Use "→" for bullet points. No emojis. Plain text only.

=== ABOUT ===
Full name: Yashwanth Reddy Reddygari
Title: AI & Full Stack Developer
Education: Final-year B.E. CSE student at MVSR Engineering College (2022–2026), CGPA: 8.87/10.0
Location: Hyderabad, India
Email: ryashwanthreddygari@gmail.com
GitHub: https://github.com/ryash14
LinkedIn: https://linkedin.com/in/yashredd
LeetCode: https://leetcode.com/u/Yashwanth1408/
Resume: https://drive.google.com/file/d/1QWG0xbtoWojqe-oO3Kl5__xWbCPx8LK7/view?usp=sharing
Status: Open to full-time SDE roles, graduating 2026

=== PERSONAL LIFE ===
Yashwanth is a passionate developer from Hyderabad who lives at the intersection of research and product building. He is driven by a deep curiosity about how AI systems can solve real-world problems.
Outside academics, he enjoys Badminton, Cricket, and strategic online games.
He recently completed a research internship at DLRL (Defence Electronics Research Laboratory) where he worked on RAG systems using LLMs — one of the more challenging and rewarding projects he has undertaken.
He also led a team of five to develop the landing page of MVSR Engineering College's official website (mvsrec.edu.in), which sharpened his leadership and team coordination skills.
He is known for his reliability, focus, and competitive spirit — having won 4 hackathons including 2 national-level events.

=== INTERNSHIPS / EXPERIENCE (3 total) ===
1. Project Intern — AI Research, ISRO (NRSC), 2025
   → Gap-filling TROPOMI satellite data (NO2, SO2, CO, PM2.5, PM10) for India 2019–2024
   → ML imputation via DINEOF approach — internal cross-validation r=0.8; OMI validation r=0.53
   → Identified Indo-Pacific pollution hotspots from multi-year reconstructed time series
   → Ongoing: downscaling TROPOMI retrievals to fine spatial resolution using deep learning
   → Stack: Python, GIS, NumPy, Scikit-learn, Pandas

2. Research & Development Intern, DLRL — DRDO, 2024
   → Built offline AI document QA system for defense use (PDF/DOCX, air-gapped, no external APIs)
   → RAG pipeline: PyMuPDF ingestion → ChromaDB vector store → CrossEncoder reranking → LLaMA 3.2 via Ollama
   → ~40% retrieval accuracy improvement through chunking strategy and reranking
   → 50% load time reduction via persistent embedding cache
   → Delivered Streamlit UI for non-technical defense staff — fully offline, zero data leakage
   → Stack: Python, LangChain, ChromaDB, Ollama, LLaMA 3.2, Streamlit

3. Team Lead — Website Redesign, MVSR Engineering College, 2024
   → Selected after winning internal hackathon (1st/100 teams) to redesign official MVSR website
   → Led a team of five; implemented dark/light mode, sticky announcements, live rollout to college community
   → Stack: HTML5, Tailwind CSS, JavaScript

=== PROJECTS (7 shipped) ===
1. Anantha AI — AI-powered conversational interface for 23 years of ARGO ocean data
   → Natural language queries over massive oceanographic dataset using RAG and LLMs
   → LSTM-based forecasting and anomaly detection; interactive Streamlit dashboards
   → Stack: FastAPI, PostgreSQL, ChromaDB, LSTM, Transformers, RAG, Streamlit, Redis
   → Live: https://anantha.live

2. SmartDocAI — Privacy-focused RAG-based PDF document assistant using local LLMs
   → Processes PDFs entirely on-device — no data leaves the machine
   → Stack: Streamlit, Ollama (Llama 3.2), ChromaDB, LangChain, Python
   → GitHub: https://github.com/ryash14/SmartDocAI

3. LearnityX — AI career accelerator with mock interviews and resume insights (National Finalist — Encode 25)
   → Adaptive mock interviews and personalized practice modules using Gemini API
   → Stack: React, Tailwind CSS, Firebase, Gemini API, Netlify
   → Live: https://learnityx.netlify.app/ | GitHub: https://github.com/ryash14/LearnityX

4. UrbanFlow — AI traffic management with real-time violation detection (National Champion — HackSavvy 2025)
   → YOLOv8-based violation detection, ambulance-aware adaptive signals, auto-challan generation
   → Stack: YOLOv8, ResNet, Flask, Python
   → GitHub: https://github.com/ryash14/UrbanFlow

5. ClassForge — AI education platform for instant answers and auto-generated question papers
   → Teachers upload syllabus to auto-generate personalized question papers; students get instant AI answers
   → Stack: HTML, Tailwind, JavaScript, Firebase, Gemini API
   → Live: https://classforge.onrender.com/ | GitHub: https://github.com/ryash14/ClassForge

6. Online Code Editor — Multi-language web IDE with Monaco Editor
   → VS Code-like UX for online coding and testing with dynamic input
   → Stack: Monaco Editor, Node.js, Express, MySQL
   → Live: https://codecraft-xwcu.onrender.com/ | GitHub: https://github.com/ryash14/OnlineCodeEditor

7. Fake Product Identification — Counterfeit detection with QR-based product authentication
   → Secure product verification with admin analytics dashboard
   → Stack: PHP, MySQL, JavaScript
   → GitHub: https://github.com/ryash14/FakeProductIdentification

=== SKILLS ===
Languages: Python, Java, JavaScript, C, SQL
Frontend: React, HTML, CSS, Tailwind CSS, Bootstrap
Backend & DB: Node.js, Express, PostgreSQL, MySQL
AI/ML: LangChain, ChromaDB, Ollama, LSTM, YOLOv8, RAG, Transformers, FastAPI
Tools: Git, Docker, AWS, Netlify, Firebase, VS Code

=== ACHIEVEMENTS ===
→ National Champion — HackSavvy 2025 (1st Place): Built UrbanFlow AI, led team of 4
→ National Finalist — Encode 25 (2nd Place): LearnityX, among 500+ teams
→ CSI Hackathon Winner: Regional winner for UrbanFlow AI
→ MVSR Website Redesign Team Lead: Selected after winning internal hackathon (1st out of 100 teams)
→ 4 hackathon wins total including 2 national-level events

=== EDUCATION ===
→ B.E. CSE — MVSR Engineering College (2022–2026), CGPA: 8.87
→ Class XII — Narayana Junior College (2020–2022), 96.7%
→ Class X — Bhashyam High School (2019–2020), 10.0 GPA

=== CERTIFICATIONS (8) ===
AWS Cloud Foundations, Generative AI Virtual Internship, Frontend Web Development, Python for Data Science, Machine Learning Basics, Cloud Computing Fundamentals, Git & Collaboration, Hackathon Winner — College/Regional

=== COMPETITIVE PROGRAMMING ===
→ 300+ LeetCode problems solved
→ Consistent practice in data structures, algorithms, and system design

Always answer every part of a multi-part question. If asked about skills AND projects AND experience, answer ALL three. Never truncate. If asked about personal life, share the personal details above warmly and naturally.`;

// ── API key pool ─────────────────────────────────────────────────────────────
// Supports numbered keys (GEMINI_API_KEY1/2/3) and legacy single key names
// Built inside the handler so env vars are read fresh on every request
function getApiKeys(): string[] {
  return [
    process.env.GEMINI_API_KEY1,
    process.env.GEMINI_API_KEY2,
    process.env.GEMINI_API_KEY3,
    process.env.GEMINI_API_KEY,
    process.env.GEMINI_API,
  ].filter(Boolean) as string[];
}

// ── Static fallback responses (used when all API keys fail) ──────────────────
const FALLBACKS: { pattern: RegExp; response: string }[] = [
  {
    pattern: /who|about|yourself|introduce|yashwanth|tell me/i,
    response: `Yashwanth Reddy Reddygari is a final-year B.E. CSE student at MVSR Engineering College (2022–2026), CGPA 8.87/10, based in Hyderabad.

→ AI & Full Stack Developer specialising in scalable software and AI systems
→ Research intern at ISRO (NRSC) — satellite data gap-filling using ML
→ R&D intern at DLRL–DRDO — built an offline AI document QA system for defense
→ Led a 5-person team to redesign the official MVSR Engineering College website
→ 4 hackathon wins including 2 national-level events
→ Open to full-time SDE roles, graduating 2026`,
  },
  {
    pattern: /experience|internship|work|isro|dlrl|drdo|nrsc/i,
    response: `Yashwanth has 3 key experiences:

1. Project Intern — AI Research, ISRO (NRSC), 2025
   → Gap-filling TROPOMI satellite data for India 2019–2024 using DINEOF (ML imputation)
   → r=0.8 internal CV; r=0.53 OMI validation; identified Indo-Pacific pollution hotspots
   → Stack: Python, GIS, NumPy, Scikit-learn, Pandas

2. R&D Intern, DLRL–DRDO, 2024
   → Offline AI document QA system — RAG pipeline, ChromaDB, LLaMA 3.2, zero data leakage
   → ~40% retrieval accuracy improvement; 50% load time reduction via embedding cache
   → Stack: Python, LangChain, ChromaDB, Ollama, LLaMA 3.2, Streamlit

3. Team Lead — MVSR Website Redesign, 2024
   → Selected after winning internal hackathon (1st/100 teams); led team of 5
   → Stack: HTML5, Tailwind CSS, JavaScript`,
  },
  {
    pattern: /project|built|anantha|urbanflow|learnity|smartdoc|classforge|code.?editor/i,
    response: `Yashwanth has shipped 7 projects:

1. Anantha AI — AI interface for 23 years of ARGO ocean data → anantha.live
2. SmartDocAI — Privacy-first RAG PDF assistant using local LLMs (fully on-device)
3. LearnityX — AI career accelerator, mock interviews (National Finalist — Encode 25) → learnityx.netlify.app
4. UrbanFlow — YOLOv8 AI traffic management (National Champion — HackSavvy 2025)
5. ClassForge — AI education platform, auto-generated question papers → classforge.onrender.com
6. Online Code Editor — Monaco Editor-based multi-language web IDE → codecraft-xwcu.onrender.com
7. Fake Product Identification — QR-based counterfeit detection`,
  },
  {
    pattern: /skill|tech|stack|language|framework|tool/i,
    response: `Yashwanth's tech stack:

→ Languages: Python, Java, JavaScript, C, SQL
→ Frontend: React, Next.js, Tailwind CSS, HTML/CSS
→ Backend & DB: Node.js, Express, PostgreSQL, MySQL
→ AI/ML: LangChain, ChromaDB, Ollama, LSTM, YOLOv8, RAG, Transformers, FastAPI
→ Tools: Git, Docker, AWS, Firebase, Netlify`,
  },
  {
    pattern: /contact|email|reach|hire|linkedin|github|resume/i,
    response: `How to reach Yashwanth:

→ Email: ryashwanthreddygari@gmail.com
→ GitHub: https://github.com/ryash14
→ LinkedIn: https://linkedin.com/in/yashredd
→ LeetCode: https://leetcode.com/u/Yashwanth1408/
→ Resume: https://drive.google.com/file/d/1QWG0xbtoWojqe-oO3Kl5__xWbCPx8LK7/view?usp=sharing
→ Status: Open to full-time SDE roles, graduating 2026`,
  },
  {
    pattern: /achiev|hackathon|award|win|champion|finalist/i,
    response: `Yashwanth's achievements:

→ National Champion — HackSavvy 2025 (1st Place): UrbanFlow AI, led team of 4
→ National Finalist — Encode 25 (2nd Place): LearnityX, among 500+ teams
→ CSI Hackathon Winner: Regional winner for UrbanFlow AI
→ MVSR Website Redesign: 1st out of 100 teams in internal hackathon
→ 300+ LeetCode problems solved`,
  },
  {
    pattern: /education|college|university|degree|cgpa|gpa|study|school/i,
    response: `Yashwanth's education:

→ B.E. CSE — MVSR Engineering College (2022–2026), CGPA: 8.87/10
→ Class XII — Narayana Junior College (2020–2022), 96.7%
→ Class X — Bhashyam High School (2019–2020), 10.0 GPA`,
  },
  {
    pattern: /hobby|sport|badminton|cricket|personal|life|interest|outside/i,
    response: `Outside work, Yashwanth enjoys Badminton, Cricket, and strategic online games. He is based in Hyderabad, driven by curiosity about how AI can solve real-world problems. Known for reliability, focus, and a competitive spirit.`,
  },
];
console.log("GEMINI KEY:", process.env.GEMINI_API_KEY);
function getFallbackResponse(message: string): string {
  for (const { pattern, response } of FALLBACKS) {
    if (pattern.test(message)) return response;
  }
  return `I'm having trouble connecting right now. You can reach Yashwanth directly at ryashwanthreddygari@gmail.com or explore his work at https://github.com/ryash14.`;
}

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  if (!message?.trim()) {
    return NextResponse.json({ error: "Empty message" }, { status: 400 });
  }

  const apiKeys = getApiKeys();

  if (apiKeys.length === 0) {
    return NextResponse.json({ response: getFallbackResponse(message) });
  }

  // Try each API key; on 429 or error rotate to the next key
  for (let keyIdx = 0; keyIdx < apiKeys.length; keyIdx++) {
    const ai = new GoogleGenAI({ apiKey: apiKeys[keyIdx] });

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const result = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: message,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            maxOutputTokens: 1200,
            temperature: 0.3,
          },
        });
        return NextResponse.json({ response: result.text });
      } catch (err: unknown) {
        const status = (err as { status?: number })?.status;
        if (status === 429 && attempt === 0) {
          await sleep(1500);
          continue; // retry same key once
        }
        // Any other error or second 429 → move to next key
        break;
      }
    }
  }

  // All keys exhausted — return static fallback
  return NextResponse.json({ response: getFallbackResponse(message) });
}

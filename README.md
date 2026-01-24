🚀 AI Resume Builder (ATS Optimized)

An end-to-end AI-powered Resume Builder that generates ATS-optimized resumes using real-time AI streaming, calculates ATS compatibility score, allows secure Stripe payments, and exports professional PDF resumes.

⚡ Built as a full-stack production-grade project with modern UI, scalable backend, and real-time streaming.



✨ Features
🧠 AI Resume Optimization

Real-time AI resume generation using Server-Sent Events (SSE)

ATS-friendly keyword optimization

Streams content word-by-word (no page reload)

📊 ATS Compatibility Score

Live ATS score calculation after resume optimization

Keyword-based ATS scoring (demo-safe, no paid embeddings)

Designed to be easily replaceable with vector embeddings later

💳 Secure Payments (Stripe)

Stripe Checkout integration

₹499 payment required before PDF download

Test mode supported for demo & presentation

📄 Resume PDF Export

High-quality PDF resume generated using Puppeteer

Clean, professional resume layout

Download available only after successful payment

⚡ Real-Time Streaming (SSE)

Server-Sent Events for AI streaming

Proper connection cleanup to avoid memory leaks

Handles client disconnects safely

🎨 Modern Responsive UI

Fully responsive (Desktop / Tablet / Mobile)

Clean two-panel layout:

Left: Resume form

Right: Live AI preview + payment

Scroll behavior carefully controlled (no layout break)

🐳 Dockerized Application

Backend & frontend Dockerized

Easy deployment on Render / Railway / VPS

🧩 Tech Stack
🖥️ Frontend

React.js

Redux Toolkit (state management)

Server-Sent Events (EventSource)

Inline CSS / Styled Layout

Vite

⚙️ Backend

Node.js

Express.js

Server-Sent Events (SSE)

Stripe SDK

Puppeteer (PDF generation)

dotenv

🤖 AI

Google Gemini API (gemini-1.5-flash)

Streaming text generation

ATS keyword-based scoring (demo-safe)

🗄️ Database

MongoDB Atlas (optional, future extension)

Vector-ready architecture

💳 Payments

Stripe Checkout

Secure server-side payment session creation

🐳 DevOps

Docker

Render (deployment)

GitHub (CI/CD ready)

🏗️ System Architecture
Frontend (React)
   |
   |  SSE (EventSource)
   ↓
Backend (Express)
   |
   |  AI Stream (Gemini)
   |  ATS Score
   |  Stripe Checkout
   |  PDF Generation
   ↓
Client (Resume Download)

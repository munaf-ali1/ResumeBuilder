import express from "express";
import llm from "../config/gemini.js";

const sseRouter = express.Router();

sseRouter.get("/stream", async (req, res) => {
  // ✅ Mandatory SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const {
    name = "",
    role = "",
    experience = "",
    skills = "",
    jd = "",
  } = req.query;

  let fullAIText = "";
  let isClientConnected = true;

  // ✅ Client disconnect safety
  req.on("close", () => {
    isClientConnected = false;
    console.log("❌ Client disconnected SSE");
  });

  const prompt = `
You are an expert ATS resume optimizer.

Optimize the resume to best match the job description
using ATS-friendly keywords and professional language.

JOB DESCRIPTION:
${jd}

RESUME:
Name: ${name}
Target Role: ${role}

Experience:
${experience}

Skills:
${skills}

Return only the optimized resume.
`;

  try {
    // Gemini streaming (TEXT ONLY – allowed in free tier)
    const stream = await llm.generateContentStream(prompt);

    for await (const chunk of stream.stream) {
      if (!isClientConnected) break;

       const text = chunk.text();
       fullAIText += text;  

      // 🔹 AI STREAM EVENT
      res.write(`event: ai\ndata: ${text}\n\n`);
    }

    if (!isClientConnected) return;

    //  SAFE ATS SCORE (Keyword based – NO EMBEDDINGS)
    let atsScore = 65;

    if (jd && skills) {
      const jdWords = jd.toLowerCase().split(/\W+/);
      const skillWords = skills.toLowerCase().split(/\W+/);

      const matchCount = skillWords.filter((s) =>
        jdWords.includes(s)
      ).length;

      atsScore = Math.min(
        95,
        60 + matchCount * 5
      );
    }

    //  ATS SCORE EVENT
    res.write(`event: ats\ndata: ${atsScore}\n\n`);

    //  DONE EVENT
    res.write(`event: done\ndata: done\n\n`);
    res.end();
  } catch (err) {
    console.error("SSE ERROR:", err.message);

    res.write(`event: error\ndata: error\n\n`);
    res.end();
  }
});

export default sseRouter;




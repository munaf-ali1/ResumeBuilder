import express from "express";
import llm from "../config/gemini.js";
import { storeJDVector } from "../services/jdVector.service.js";
import { calculateVectorATS } from "../services/atsVector.service.js";

const sseRouter = express.Router();

sseRouter.get("/stream", async (req, res) => {
  // 🔴 Mandatory SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // 🔹 Resume + JD from query params
  const {
    name = "",
    role = "",
    experience = "",
    skills = "",
    jd = "",
  } = req.query;

  // 🔹 Store JD as VECTOR (once per request)
  await storeJDVector(jd);

  // 🔹 AI Prompt
  const prompt = `
You are an expert ATS resume optimizer.

Optimize the following resume to match the job description
using professional language and ATS-friendly keywords.

JOB DESCRIPTION:
${jd}

RESUME DETAILS:
Name: ${name}
Target Role: ${role}

Experience:
${experience}

Skills:
${skills}

Return only the optimized resume content.
`;

  let fullAIText = "";

  try {
    // Gemini streaming
    const stream = await llm.stream(prompt);

    for await (const chunk of stream) {
      const text = chunk?.content || "";
      fullAIText += text;

      //  AI STREAM EVENT
      res.write(`event: ai\ndata: ${text}\n\n`);
    }

    // VECTOR ATS SCORE (AFTER AI DONE)
    const atsScore = await calculateVectorATS(fullAIText);

    //  ATS EVENT
    res.write(`event: ats\ndata: ${atsScore}\n\n`);

    //  DONE EVENT
    res.write(`event: done\ndata: done\n\n`);
    res.end();
  } catch (err) {
    console.error(err);
    res.write(`event: error\ndata: error\n\n`);
    res.end();
  }
});

export default sseRouter;


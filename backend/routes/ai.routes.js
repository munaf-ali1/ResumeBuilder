import express from "express";;
import { analyzeJD } from "../aiAgents/jdAnalyzer.agent.js";
import { rewriteBullet } from "../aiAgents/resumeRewrite.agent.js";
import llm from "../config/gemini.js";


const aiRouter = express.Router();

aiRouter.post("/optimize", async (req, res) => {
  const { jd, bullet } = req.body;

  const keywords = await analyzeJD(jd);
  const improvedBullet = await rewriteBullet(bullet, keywords[0]);

  res.json({
    keywords,
    improvedBullet,
  });
});

export default aiRouter;





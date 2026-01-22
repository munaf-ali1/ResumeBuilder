import createLLM from "../config/gemini.js";
import { PromptTemplate } from "@langchain/core/prompts";
import { RESUME_REWRITE_PROMPT } from "../utils/prompts.js";

const rewritePrompt = new PromptTemplate({
  template: RESUME_REWRITE_PROMPT,
  inputVariables: ["bullet", "keyword"],
});

export const rewriteBullet = async (bullet, keyword) => {
  const llm = createLLM();
  const prompt = await rewritePrompt.format({ bullet, keyword });
  const response = await llm.invoke(prompt);
  return response.content;
};

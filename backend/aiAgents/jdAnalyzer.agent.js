import createLLM from "../config/gemini.js";
import { PromptTemplate } from "@langchain/core/prompts";
import { JD_KEYWORD_PROMPT } from "../utils/prompts.js";

const jdPrompt = new PromptTemplate({
  template: JD_KEYWORD_PROMPT,
  inputVariables: ["jd"],
});

export const analyzeJD = async (jdText) => {
  const llm = createLLM();
  const formattedPrompt = await jdPrompt.format({ jd: jdText });
  const response = await llm.invoke(formattedPrompt);
  return JSON.parse(response.content);
};

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const createLLM = () => new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0.4,
});

export default createLLM;

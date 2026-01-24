import { GoogleGenerativeAI } from "@google/generative-ai";
if (!process.env.GOOGLE_API_KEY) {
  throw new Error("❌ GEMINI_API_KEY missing in env");
}
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3",
});

export default model;


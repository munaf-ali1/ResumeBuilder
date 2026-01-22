import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const createEmbeddings = () => new GoogleGenerativeAIEmbeddings({
  model: "models/embedding-001",
  apiKey: process.env.GOOGLE_API_KEY,
});

export default createEmbeddings;

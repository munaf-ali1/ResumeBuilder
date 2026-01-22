import mongoose from "mongoose";

const JDSchema = new mongoose.Schema({
  content: String,
  extractedKeywords: [String],
});

export default mongoose.model("JobDescription", JDSchema);

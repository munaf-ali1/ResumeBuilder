import mongoose from "mongoose";

const jdVectorSchema = new mongoose.Schema({
  content: String,
  embedding: {
    type: [Number],
    index: "vector",
    dimensions: 768,
  },
});

export default mongoose.model("JDVector", jdVectorSchema);

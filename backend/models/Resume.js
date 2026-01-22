import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    linkedin: String,
  },
  education: [
    {
      degree: String,
      institute: String,
      year: String,
    },
  ],
  experience: [
    {
      role: String,
      company: String,
      bullets: [String],
    },
  ],
  skills: [String],
  projects: [String],
});

export default mongoose.model("Resume", ResumeSchema);

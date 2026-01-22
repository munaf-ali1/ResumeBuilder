import express from "express";
import { generateResumePDF } from "../services/pdf.service.js";

const pdfRouter = express.Router();

pdfRouter.post("/resume", async (req, res) => {
  try {
    const { html } = req.body;

    const pdf = await generateResumePDF(html);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=resume.pdf"
    );

    res.send(pdf);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "PDF generation failed" });
  }
});

export default pdfRouter;

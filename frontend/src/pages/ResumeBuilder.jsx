
import { useDispatch, useSelector } from "react-redux";
import {
  startStreaming,
  appendAIText,
  stopStreaming,
  setATSScore,
} from "../redux/resumeSlice.js";
import { startAIStream } from "../services/sse.js";
import ResumeForm from "../components/ResumeForm.jsx";
import { resumeHTML } from "../../utils/resumeTemplate.js";
import { useState } from "react";

const ResumeBuilder = () => {
  const dispatch = useDispatch();
  const { aiText, isStreaming, atsScore, resumeData } = useSelector(
    (state) => state.resume
  );

  const [isPaid, setIsPaid] = useState(false);

  /* =====================
        AI OPTIMIZATION
  ====================== */
  const handleOptimize = () => {
    dispatch(startStreaming());

    startAIStream(
      resumeData,
      (chunk) => dispatch(appendAIText(chunk)),
      (score) => dispatch(setATSScore(score)),
      () => dispatch(stopStreaming())
    );
  };

  /* =====================
        STRIPE PAYMENT
  ====================== */
  const handlePayment = async () => {
    if (!aiText) {
      alert("Please optimize resume first");
      return;
    }

    const res = await fetch(
      "http://localhost:8000/api/stripe/create-checkout-session",
      { method: "POST" }
    );

    const data = await res.json();
    window.location.href = data.url;
  };

  /* =====================
        PDF DOWNLOAD
  ====================== */
  const downloadPDF = async () => {
    const res = await fetch("https://resumebuilder-backend-ko8w.onrender.com/api/pdf/resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html: resumeHTML(aiText) }),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "AI_Resume.pdf";
    a.click();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* LEFT */}
        <div style={styles.left}>
          <h2 style={styles.heading}>Resume Details</h2>
          <ResumeForm />

          <button
            onClick={handleOptimize}
            disabled={isStreaming}
            style={{
              ...styles.primaryBtn,
              ...(isStreaming ? styles.disabled : {}),
            }}
          >
            {isStreaming ? "Optimizing..." : "Optimize Resume"}
          </button>
        </div>

        {/* RIGHT */}
        <div style={styles.right}>
          <h2 style={styles.heading}>Live AI Preview</h2>

          <div style={styles.ats}>
            <span>ATS Score</span>
            <strong>{atsScore}%</strong>
          </div>

          <div style={styles.output}>
            <pre style={styles.text}>
              {aiText || "AI optimized resume will appear here..."}
              {isStreaming && <span style={styles.cursor}>│</span>}
            </pre>

            {!isPaid ? (
              <button onClick={handlePayment} style={styles.secondaryBtn}>
                Pay ₹499 & Download PDF
              </button>
            ) : (
              <button onClick={downloadPDF} style={styles.secondaryBtn}>
                Download Resume PDF
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;

/* =====================
          STYLES
===================== */

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #020617, #000)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "1100px",
    background: "linear-gradient(180deg,#0f172a,#020617)",
    borderRadius: "18px",
    border: "1px solid #1e293b",
    boxShadow: "0 40px 100px rgba(0,0,0,.9)",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    overflow: "hidden",
  },

  left: {
    padding: "24px",
    borderRight: "1px solid #1e293b",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  right: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  heading: {
    color: "#f8fafc",
    fontSize: "18px",
    fontWeight: "600",
  },

  primaryBtn: {
    marginTop: "10px",
    background: "linear-gradient(90deg,#22c55e,#16a34a)",
    color: "#020617",
    border: "none",
    padding: "14px",
    borderRadius: "12px",
    fontWeight: "700",
    cursor: "pointer",
  },

  secondaryBtn: {
    marginTop: "16px",
    background: "#020617",
    border: "1px solid #1e293b",
    color: "#e5e7eb",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  disabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  ats: {
    display: "flex",
    justifyContent: "space-between",
    background: "#020617",
    border: "1px solid #1e293b",
    padding: "12px 16px",
    borderRadius: "12px",
    color: "#94a3b8",
  },

  output: {
    flex: 1,
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: "12px",
    padding: "16px",
    overflowY: "auto",
    maxHeight: "360px",
  },

  text: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "13px",
    lineHeight: "1.7",
    color: "#d1fae5",
    whiteSpace: "pre-wrap",
    margin: 0,
  },

  cursor: {
    color: "#22c55e",
    fontWeight: "700",
  },

  /* 📱 MOBILE */
  "@media (max-width: 768px)": {
    card: {
      gridTemplateColumns: "1fr",
    },
    left: {
      borderRight: "none",
      borderBottom: "1px solid #1e293b",
    },
  },
};

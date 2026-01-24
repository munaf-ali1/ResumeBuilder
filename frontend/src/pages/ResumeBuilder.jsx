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

  
       // AI OPTIMIZATION
  
  const handleOptimize = () => {
    dispatch(startStreaming());

    startAIStream(
      resumeData,
      (chunk) => dispatch(appendAIText(chunk)),
      (score) => dispatch(setATSScore(score)),
      () => dispatch(stopStreaming())
    );
  };


      //  STRIPE PAYMENT

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

 
       // PDF DOWNLOAD
  const downloadPDF = async () => {
    const res = await fetch("http://localhost:8000/api/pdf/resume", {
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
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>📄</div>
            <h1 style={styles.title}>AI Resume Builder</h1>
          </div>
          <p style={styles.subtitle}>Create ATS-optimized resumes with AI</p>
        </div>

        {/* Main Content */}
        <div style={styles.card}>
          {/* LEFT PANEL */}
          <div style={styles.left}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionIcon}>✏️</div>
              <h2 style={styles.heading}>Resume Details</h2>
            </div>
            <ResumeForm />

            <button
              onClick={handleOptimize}
              disabled={isStreaming}
              style={{
                ...styles.primaryBtn,
                ...(isStreaming ? styles.disabled : {}),
              }}
            >
              {isStreaming ? (
                <span style={styles.loadingText}>
                  <span style={styles.spinner}>⚡</span> Optimizing...
                </span>
              ) : (
                <span style={styles.btnText}>
                  <span style={styles.btnIcon}>🚀</span> Optimize Resume
                </span>
              )}
            </button>
          </div>

          {/* RIGHT PANEL */}
          <div style={styles.right}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionIcon}>🤖</div>
              <h2 style={styles.heading}>Live AI Preview</h2>
            </div>

            <div style={styles.atsContainer}>
              <div style={styles.atsHeader}>
                <span style={styles.atsLabel}>ATS Compatibility Score</span>
                <div style={styles.atsScoreWrapper}>
                  <div style={styles.atsScore}>{atsScore}%</div>
                  <div style={styles.atsBar}>
                    <div 
                      style={{
                        ...styles.atsProgress,
                        width: `${atsScore}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.outputContainer}>
              <div style={styles.outputHeader}>
                <span style={styles.outputLabel}>AI-Optimized Resume</span>
                {isStreaming && <span style={styles.streamingBadge}>Live</span>}
              </div>
              <div style={styles.output}>
                <pre style={styles.text}>
                  {aiText || "Your AI-optimized resume will appear here..."}
                  {isStreaming && <span style={styles.cursor}>│</span>}
                </pre>
              </div>

              {!isPaid ? (
                <button onClick={handlePayment} style={styles.secondaryBtn}>
                  <span style={styles.btnText}>
                    <span style={styles.btnIcon}>💳</span> 
                    Pay ₹499 & Download PDF
                  </span>
                </button>
              ) : (
                <button onClick={downloadPDF} style={styles.successBtn}>
                  <span style={styles.btnText}>
                    <span style={styles.btnIcon}>⬇️</span> 
                    Download Resume PDF
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;


      
const styles = {
 
  page: {
    height: "100dvh", 
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "12px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    overflow: "hidden", 
  },

  /*  CONTAINER */
  container: {
    width: "100%",
    maxWidth: "1200px",
    height: "100%",        
    marginTop: "12px",
    display: "flex",
    flexDirection: "column",
  },

  /*  CARD */
  card: {
    flex: 1,             
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "22px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    minHeight: 0,         
  },

  /* LEFT (FORM + BUTTON ALWAYS VISIBLE) */
  left: {
    padding: "24px",
    borderRight: "1px solid rgba(0, 0, 0, 0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    background: "rgba(255, 255, 255, 0.5)",
    overflowY: "auto",    
    minHeight: 0,         
  },

  /* RIGHT (PREVIEW AREA) */
  right: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    background: "rgba(255, 255, 255, 0.3)",
    minHeight: 0,        
  },

  heading: {
    color: "#1a202c",
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
  },

  /*  BUTTONS */
  primaryBtn: {
    marginTop: "auto",    
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "15px",
  },

  secondaryBtn: {
    marginTop: "12px",
    background: "#1a202c",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "14px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
  },

  disabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  /*  ATS */
  atsContainer: {
    background: "white",
    borderRadius: "14px",
    padding: "16px",
    border: "1px solid rgba(0, 0, 0, 0.08)",
  },

  atsLabel: {
    fontSize: "13px",
    color: "#4a5568",
  },

  atsScore: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#667eea",
  },

  /* OUTPUT (ONLY THIS SCROLLS) */
  output: {
    flex: 1,              
    background: "white",
    borderRadius: "14px",
    padding: "16px",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    overflowY: "auto",   
  },

  text: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#2d3748",
    whiteSpace: "pre-wrap",
    margin: 0,
  },

  cursor: {
    color: "#667eea",
    fontWeight: "700",
  },

  /*  MOBILE */
  "@media (max-width: 768px)": {
    card: {
      gridTemplateColumns: "1fr",
    },
    left: {
      borderRight: "none",
      borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
      padding: "20px",
    },
    right: {
      padding: "20px",
    },
  },
};




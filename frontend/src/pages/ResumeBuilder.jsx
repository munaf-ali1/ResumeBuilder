
// import { useDispatch, useSelector } from "react-redux";
// import {
//   startStreaming,
//   appendAIText,
//   stopStreaming,
//   setATSScore,
// } from "../redux/resumeSlice.js";
// import { startAIStream } from "../services/sse.js";
// import ResumeForm from "../components/ResumeForm.jsx";
// import { resumeHTML } from "../../utils/resumeTemplate.js";
// import { useState } from "react";

// const ResumeBuilder = () => {
//   const dispatch = useDispatch();
//   const { aiText, isStreaming, atsScore, resumeData } = useSelector(
//     (state) => state.resume
//   );

//   const [isPaid, setIsPaid] = useState(false);

//   /* =====================
//         AI OPTIMIZATION
//   ====================== */
//   const handleOptimize = () => {
//     dispatch(startStreaming());

//     startAIStream(
//       resumeData,
//       (chunk) => dispatch(appendAIText(chunk)),
//       (score) => dispatch(setATSScore(score)),
//       () => dispatch(stopStreaming())
//     );
//   };

//   /* =====================
//         STRIPE PAYMENT
//   ====================== */
//   const handlePayment = async () => {
//     if (!aiText) {
//       alert("Please optimize resume first");
//       return;
//     }

//     const res = await fetch(
//       "http://localhost:8000/api/stripe/create-checkout-session",
//       { method: "POST" }
//     );

//     const data = await res.json();
//     window.location.href = data.url;
//   };

//   /* =====================
//         PDF DOWNLOAD
//   ====================== */
//   const downloadPDF = async () => {
//     const res = await fetch("https://resumebuilder-backend-ko8w.onrender.com/api/pdf/resume", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ html: resumeHTML(aiText) }),
//     });

//     const blob = await res.blob();
//     const url = window.URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "AI_Resume.pdf";
//     a.click();
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         {/* LEFT */}
//         <div style={styles.left}>
//           <h2 style={styles.heading}>Resume Details</h2>
//           <ResumeForm />

//           <button
//             onClick={handleOptimize}
//             disabled={isStreaming}
//             style={{
//               ...styles.primaryBtn,
//               ...(isStreaming ? styles.disabled : {}),
//             }}
//           >
//             {isStreaming ? "Optimizing..." : "Optimize Resume"}
//           </button>
//         </div>

//         {/* RIGHT */}
//         <div style={styles.right}>
//           <h2 style={styles.heading}>Live AI Preview</h2>

//           <div style={styles.ats}>
//             <span>ATS Score</span>
//             <strong>{atsScore}%</strong>
//           </div>

//           <div style={styles.output}>
//             <pre style={styles.text}>
//               {aiText || "AI optimized resume will appear here..."}
//               {isStreaming && <span style={styles.cursor}>│</span>}
//             </pre>

//             {!isPaid ? (
//               <button onClick={handlePayment} style={styles.secondaryBtn}>
//                 Pay ₹499 & Download PDF
//               </button>
//             ) : (
//               <button onClick={downloadPDF} style={styles.secondaryBtn}>
//                 Download Resume PDF
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumeBuilder;

// /* =====================
//           STYLES
// ===================== */

// const styles = {
//   page: {
//     minHeight: "100vh",
//     background: "radial-gradient(circle at top, #020617, #000)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "20px",
//   },

//   card: {
//     width: "100%",
//     maxWidth: "1100px",
//     background: "linear-gradient(180deg,#0f172a,#020617)",
//     borderRadius: "18px",
//     border: "1px solid #1e293b",
//     boxShadow: "0 40px 100px rgba(0,0,0,.9)",
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     overflow: "hidden",
//   },

//   left: {
//     padding: "24px",
//     borderRight: "1px solid #1e293b",
//     display: "flex",
//     flexDirection: "column",
//     gap: "14px",
//   },

//   right: {
//     padding: "24px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "14px",
//   },

//   heading: {
//     color: "#f8fafc",
//     fontSize: "18px",
//     fontWeight: "600",
//   },

//   primaryBtn: {
//     marginTop: "10px",
//     background: "linear-gradient(90deg,#22c55e,#16a34a)",
//     color: "#020617",
//     border: "none",
//     padding: "14px",
//     borderRadius: "12px",
//     fontWeight: "700",
//     cursor: "pointer",
//   },

//   secondaryBtn: {
//     marginTop: "16px",
//     background: "#020617",
//     border: "1px solid #1e293b",
//     color: "#e5e7eb",
//     padding: "12px",
//     borderRadius: "10px",
//     cursor: "pointer",
//   },

//   disabled: {
//     opacity: 0.6,
//     cursor: "not-allowed",
//   },

//   ats: {
//     display: "flex",
//     justifyContent: "space-between",
//     background: "#020617",
//     border: "1px solid #1e293b",
//     padding: "12px 16px",
//     borderRadius: "12px",
//     color: "#94a3b8",
//   },

//   output: {
//     flex: 1,
//     background: "#020617",
//     border: "1px solid #1e293b",
//     borderRadius: "12px",
//     padding: "16px",
//     overflowY: "auto",
//     maxHeight: "360px",
//   },

//   text: {
//     fontFamily: "'JetBrains Mono', monospace",
//     fontSize: "13px",
//     lineHeight: "1.7",
//     color: "#d1fae5",
//     whiteSpace: "pre-wrap",
//     margin: 0,
//   },

//   cursor: {
//     color: "#22c55e",
//     fontWeight: "700",
//   },

//   /* 📱 MOBILE */
//   "@media (max-width: 768px)": {
//     card: {
//       gridTemplateColumns: "1fr",
//     },
//     left: {
//       borderRight: "none",
//       borderBottom: "1px solid #1e293b",
//     },
//   },
// };


import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../redux/resumeSlice.js";

const ResumeForm = () => {
  const dispatch = useDispatch();

  //  Redux resume data
  const resumeData = useSelector(
    (state) => state.resume.resumeData
  );

  const handleChange = (e) => {
    dispatch(
      updateField({
        field: e.target.name,
        value: e.target.value,
      })
    );
  };

  return (
    <div style={styles.form}>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Full Name</label>
        <input
          name="name"
          value={resumeData.name}
          onChange={handleChange}
          style={styles.input}
          placeholder="John Doe"
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Target Job Role</label>
        <input
          name="role"
          value={resumeData.role}
          onChange={handleChange}
          style={styles.input}
          placeholder="Senior Software Engineer"
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Experience / Projects</label>
        <textarea
          name="experience"
          value={resumeData.experience}
          onChange={handleChange}
          style={styles.textarea}
          placeholder="Describe your work experience and key projects..."
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Skills</label>
        <textarea
          name="skills"
          value={resumeData.skills}
          onChange={handleChange}
          style={styles.textarea}
          placeholder="React, Node.js, Python, AWS, Docker..."
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Job Description (JD)</label>
        <textarea
          name="jd"
          value={resumeData.jd}
          onChange={handleChange}
          style={{
            ...styles.textarea,
            minHeight: "160px",
          }}
          placeholder="Paste the complete job description here for better ATS optimization..."
        />
      </div>
    </div>
  );
};

export default ResumeForm;

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    color: "#4a5568",
    fontSize: "14px",
    fontWeight: "600",
    margin: 0,
  },

  input: {
    background: "white",
    border: "2px solid #e2e8f0",
    padding: "14px 16px",
    borderRadius: "12px",
    color: "#2d3748",
    fontSize: "15px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    transition: "all 0.3s ease",
    outline: "none",
  },

  textarea: {
    background: "white",
    border: "2px solid #e2e8f0",
    padding: "14px 16px",
    borderRadius: "12px",
    color: "#2d3748",
    fontSize: "15px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    minHeight: "120px",
    resize: "vertical",
    transition: "all 0.3s ease",
    outline: "none",
    lineHeight: "1.5",
  },
};




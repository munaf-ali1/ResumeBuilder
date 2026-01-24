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



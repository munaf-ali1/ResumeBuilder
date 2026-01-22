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
      <input
        name="name"
        value={resumeData.name}
        onChange={handleChange}
        style={styles.input}
        placeholder="Full Name"
      />

      <input
        name="role"
        value={resumeData.role}
        onChange={handleChange}
        style={styles.input}
        placeholder="Target Job Role"
      />

      <textarea
        name="experience"
        value={resumeData.experience}
        onChange={handleChange}
        style={styles.textarea}
        placeholder="Experience / Projects"
      />

      <textarea
        name="skills"
        value={resumeData.skills}
        onChange={handleChange}
        style={styles.textarea}
        placeholder="Skills (comma separated)"
      />

      {/*  JD INPUT (VECTOR ATS BASE) */}
      <textarea
        name="jd"
        value={resumeData.jd}
        onChange={handleChange}
        style={{
          ...styles.textarea,
          minHeight: "160px",
        }}
        placeholder="Paste Job Description here (JD)"
      />
    </div>
  );
};

export default ResumeForm;


const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    background: "#020617",
    border: "1px solid #1e293b",
    padding: "10px",
    borderRadius: "8px",
    color: "#e5e7eb",
  },
  textarea: {
    background: "#020617",
    border: "1px solid #1e293b",
    padding: "10px",
    borderRadius: "8px",
    color: "#e5e7eb",
    minHeight: "120px",
  },
};



import { createSlice } from "@reduxjs/toolkit";

const resumeSlice = createSlice({
  name: "resume",

  initialState: {
    //  Resume form data
    resumeData: {
      name: "",
      role: "",
      experience: "",
      skills: "",
      jd: "",
    },

    //  AI streaming
    aiText: "",
    isStreaming: false,

    //  ATS score
    atsScore: 0,
  },

  reducers: {
    
      // RESUME FORM HANDLING
    updateField(state, action) {
      const { field, value } = action.payload;
      state.resumeData[field] = value;
    },

    resetResumeForm(state) {
      state.resumeData = {
        name: "",
        role: "",
        experience: "",
        skills: "",
      };
    },

  
       //AI STREAMING HANDLING
    
    startStreaming(state) {
      state.aiText = "";
      state.isStreaming = true;
    },

    appendAIText(state, action) {
      state.aiText += action.payload;
    },

    stopStreaming(state) {
      state.isStreaming = false;
    },

    resetAIText(state) {
      state.aiText = "";
      state.isStreaming = false;
    },

   
      // ATS SCORE HANDLING
    
    setATSScore(state, action) {
      state.atsScore = action.payload;
    },
  },
});

export const {
  updateField,
  resetResumeForm,
  startStreaming,
  appendAIText,
  stopStreaming,
  resetAIText,
  setATSScore,
} = resumeSlice.actions;

export default resumeSlice.reducer;


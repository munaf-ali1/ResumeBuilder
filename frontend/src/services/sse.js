let eventSource = null;

export const startAIStream = (
  resumeData,
  onChunk,
  onScore,
  onDone
) => {
  //  Close previous stream if exists
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }

  //  Build query params safely
  const params = new URLSearchParams({
    name: resumeData.name || "",
    role: resumeData.role || "",
    experience: resumeData.experience || "",
    skills: resumeData.skills || "",
    jd: resumeData.jd || "",
  });

  eventSource = new EventSource(
    `http://localhost:8000/api/ai/stream?${params.toString()}`
  );

  //  AI text stream
  eventSource.addEventListener("ai", (event) => {
    onChunk(event.data);
  });

  //  ATS score stream
  eventSource.addEventListener("ats", (event) => {
    const score = Number(event.data);
    if (!isNaN(score)) onScore(score);
  });

  //  Done event
  eventSource.addEventListener("done", () => {
    eventSource.close();
    eventSource = null;
    onDone();
  });

  //  Error handling
  eventSource.onerror = () => {
    eventSource.close();
    eventSource = null;
    onDone();
  };
};




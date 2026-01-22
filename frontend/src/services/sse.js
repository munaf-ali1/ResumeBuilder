export const startAIStream = (
  resumeData,
  onChunk,
  onScore,
  onDone
) => {
  //  Convert resumeData to query params
  const params = new URLSearchParams(resumeData).toString();

  const eventSource = new EventSource(
    `https://resumebuilder-backend-ko8w.onrender.com/api/ai/stream?${params}`
  );

  eventSource.addEventListener('ai', (event) => {
    onChunk(event.data);
  });

  eventSource.addEventListener('ats', (event) => {
    onScore(parseInt(event.data));
  });

  eventSource.addEventListener('done', () => {
    eventSource.close();
    onDone();
  });

  eventSource.addEventListener('error', () => {
    eventSource.close();
    onDone();
  });
};



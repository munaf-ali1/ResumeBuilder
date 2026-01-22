export const startAIStream = (
  resumeData,
  onChunk,
  onScore,
  onDone
) => {
  //  Convert resumeData to query params
  const params = new URLSearchParams(resumeData).toString();

  const eventSource = new EventSource(
    `http://localhost:8000/api/ai/stream?${params}`
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



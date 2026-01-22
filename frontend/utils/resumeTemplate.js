export const resumeHTML = (content) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #111;
      line-height: 1.6;
    }
    h1 {
      font-size: 22px;
      margin-bottom: 10px;
    }
    pre {
      white-space: pre-wrap;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <h1>AI Optimized Resume</h1>
  <pre>${content}</pre>
</body>
</html>
`;

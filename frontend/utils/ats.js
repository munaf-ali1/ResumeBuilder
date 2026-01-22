export const calculateATSScore = (resumeText, skills) => {
  if (!resumeText || !skills) return 0;

  // Convert to lowercase for fair comparison
  const resume = resumeText.toLowerCase();

  // Split skills by comma
  const skillList = skills
    .split(",")
    .map((skill) => skill.trim().toLowerCase())
    .filter(Boolean);

  if (skillList.length === 0) return 0;

  // Count matched skills
  let matched = 0;

  skillList.forEach((skill) => {
    if (resume.includes(skill)) {
      matched++;
    }
  });

  // Calculate percentage
  const score = Math.round(
    (matched / skillList.length) * 100
  );

  return score;
};

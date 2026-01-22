export const JD_KEYWORD_PROMPT = `
Extract the most important technical and soft skills from this job description.
Return only a JSON array of keywords.

Job Description:
{jd}
`;

export const RESUME_REWRITE_PROMPT = `
Rewrite the following resume bullet point to be more professional and ATS-friendly.
Include the keyword: {keyword}

Bullet:
{bullet}
`;

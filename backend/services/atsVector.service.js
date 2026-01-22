import createEmbeddings from "../config/embedding.js";
import JDVector from "../models/JDVector.js";

export const calculateVectorATS = async (resumeText) => {
  const embeddings = createEmbeddings();
  const resumeEmbedding = await embeddings.embedQuery(resumeText);

  const result = await JDVector.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: resumeEmbedding,
        numCandidates: 100,
        limit: 1,
      },
    },
  ]);

  const score = result[0]?.score || 0;
  return Math.round(score * 100);
};

import createEmbeddings from "../config/embedding.js";
import JDVector from "../models/JDVector.js";

export const storeJDVector = async (jdText) => {
  const embeddings = createEmbeddings();
  const embedding = await embeddings.embedQuery(jdText);

  const doc = new JDVector({
    content: jdText,
    embedding,
  });

  await doc.save();
  return doc._id;
};

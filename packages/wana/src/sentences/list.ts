import { Collection, Document } from "mongodb";

export const listHandler = (collection: Collection<Document>) => async () => {
  const data = await collection.find({}).toArray();
  if (!data.length) throw new Error("No sentences found");
  return data;
};

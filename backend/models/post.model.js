import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ["completed", "ongoing", "proposed"] },
  image: String,
});

export default mongoose.model("Post", postSchema);
export const Post = mongoose.model("Post", postSchema);

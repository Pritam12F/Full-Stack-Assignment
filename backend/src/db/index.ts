import mongoose from "mongoose";

await mongoose.connect(process.env.MONGOOSE_URL ?? "");

const subPostSchema = new mongoose.Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: Number,
});

const PostSchema = new mongoose.Schema({
  uniqueId: Number,
  title: String,
  subPosts: [subPostSchema],
});

export const post = mongoose.model("Post", PostSchema);

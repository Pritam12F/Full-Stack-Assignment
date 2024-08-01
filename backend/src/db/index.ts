import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URL ?? "");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

main();

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
  color: {
    type: String,
    enum: ["purple", "pink", "green", "orange", "blue", "navyblue"],
    required: true,
  },
  subPosts: [subPostSchema],
});

export const post = mongoose.model("Post", PostSchema);

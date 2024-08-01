import express from "express";
import cors from "cors";
import { post } from "./db";
import { FindPostSchema, PostCreateSchema, SubPostCreateSchema } from "./types";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/getallposts", async (req, res) => {
  const allPosts = await post.find({});

  return res.json({
    allPosts,
  });
});

app.get("/getindvidualpost", async (req, res) => {
  const { success } = FindPostSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      error: "Invalid id!",
    });
  }
  const id = await req.body.id;

  try {
    const uniquePost = await post.findOne({
      uniqueId: id,
    });

    return res.json({
      uniquePost,
    });
  } catch {
    return res.json({
      message: "Error finding post",
    });
  }
});

app.post("/createpost", async (req, res) => {
  const { success } = PostCreateSchema.safeParse(req.body);

  if (!success) {
    return res.status(401).json({
      error: "Invalid inputs!",
    });
  }

  try {
    const postCreated = await post.create({
      uniqueId: req.body.uniqueId,
      title: req.body.title,
      color: req.body.color,
    });

    return res.json({
      postCreated,
    });
  } catch {
    return res.json({
      message: "Error creating post!",
    });
  }
});

app.post("/createsubpost", async (req, res) => {
  const { success } = SubPostCreateSchema.safeParse(req.body);

  if (!success) {
    return res.json({
      error: "Invalid inputs for creating subpost!",
    });
  }

  try {
    await post.findOneAndUpdate(
      {
        uniqueId: req.body.parentId,
      },
      {
        $push: { subPosts: req.body },
      }
    );
    console.log("New subpost added!");

    return res.json({
      message: "Sub post added!",
    });
  } catch {
    console.log("Error occured creating sub post");
    return res.status(411).json({
      message: "Error adding new subpost!",
    });
  }
});

app.listen(3214, () => {
  console.log("Listening on port 3214");
});

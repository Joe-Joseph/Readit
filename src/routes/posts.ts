import { Request, Response, Router } from "express";

import Comment from "../entities/Comment";
import { Post } from "../entities/Post";
import { Sub } from "../entities/Sub";

import auth from "../middleware/auth";

const createPost = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body;

  const user = res.locals.user;

  if (title.trim() === "") {
    return res.status(400).json({ title: "Title must not be empty" });
  }

  try {
    // find sub
    const subRecord = await Sub.findOne({ name: sub });

    if (!subRecord) {
      return res.status(404).json({ error: "Sub not found" });
    }

    const post = new Post({ title, body, user, sub: subRecord });
    await post.save();

    return res.status(200).json({ data: post });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

const getPosts = async (_: Request, res: Response) => {
  try {
    const posts = await Post.find({
      order: { createdAt: "DESC" },
    });

    return res.status(200).json({ data: posts });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getPost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;

  try {
    const post = await Post.findOneOrFail(
      { identifier, slug },
      { relations: ["sub"] }
    );

    return res.status(200).json({ data: post });
  } catch (err) {
    return res.status(404).json({ error: "Post not found" });
  }
};

const commentOnPost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;

  const { body } = req.body;

  try {
    const post = await Post.findOneOrFail({ identifier, slug });

    const comment = new Comment({ body, user: res.locals.user, post });
    comment.save();

    return res.status(200).json({ data: comment });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const router = Router();

router.post("/", auth, createPost);
router.get("/", getPosts);
router.get("/:identifier/:slug", getPost);
router.post("/:identifier/:slug", auth, commentOnPost);

export default router;

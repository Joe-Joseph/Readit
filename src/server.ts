import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth";
import postsRoutes from "./routes/posts";
import subsRoutes from "./routes/subs";
import trim from "./middleware/trim";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(trim);
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);

app.get("/", (_, res) => res.send("Welcome to readit!!"));
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/subs", subsRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  console.log(`server running at ${PORT}`);

  try {
    await createConnection();
    console.log("Database is connected");
  } catch (error) {
    console.log("Error", error);
  }
});

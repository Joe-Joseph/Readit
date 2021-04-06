import { Request, Response, Router } from "express";
import { isEmpty, validate } from "class-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookie from "cookie";

import { User } from "../entities/User";
import auth from "../middleware/auth";

dotenv.config();

const register = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  try {
    // Validate user
    let errors: any = {};
    const emailExist = await User.findOne({ email });
    const usernameExist = await User.findOne({ username });

    if (emailExist) errors.email = "Email alredy registered";
    if (usernameExist) errors.username = "Username alredy registered";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    // create the user
    const user = new User({ email, password, username });

    errors = await validate(user);

    if (errors.length > 0) return res.status(400).json({ errors });
    await user.save();

    // Return tehe user
    return res.status(201).json(user);
  } catch (error) {
    console.log("Register -- error", error);
    return res.status(500).json(error);
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    let errors: any = {};
    if (isEmpty(username)) errors.username = "Username must not be empty";
    if (isEmpty(password)) errors.password = "Password must not be empty";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ error: errors });
    }
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "Incorrect credentials" });

    const passwordMatches = bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ error: "Incorrect credentials" });
    }

    const token = jwt.sign({ username }, process.env.TOKEN_KEY!);

    res.set(
      "set-cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
      })
    );

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

const me = async (_: Request, res: Response) => {
  return res.json(res.locals.user);
};

const logout = async (_: Request, res: Response) => {
  res.set(
    "set-cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    })
  );

  return res.status(200).json({ success: true });
};

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", auth, logout);
router.get("/me", auth, me);

export default router;

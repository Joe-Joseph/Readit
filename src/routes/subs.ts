import { Request, Response, Router } from "express";
import { isEmpty } from "class-validator";
import { User } from "../entities/User";
import { getRepository } from "typeorm";

import auth from "../middleware/auth";
import { Sub } from "../entities/Sub";

const createSub = async (req: Request, res: Response) => {
  const { name, title, description } = req.body;

  const user: User = res.locals.user;

  try {
    let errors: any = {};

    if (isEmpty(name)) errors.name = "Name can not be empty";
    if (isEmpty(title)) errors.title = "Title can not be empty";

    const sub = await getRepository(Sub)
      .createQueryBuilder("sub")
      .where("lower(sub.name) = :name", { name: name.toLowerCase() })
      .getOne();

    if (sub) errors.name = "Sub already exist";

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ error: errors });
    }

    const subResponse = await new Sub({ name, description, title, user });
    subResponse.save();

    return res.status(200).json({ data: subResponse });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const router = Router();

router.post("/", auth, createSub);

export default router;

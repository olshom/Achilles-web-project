import { config } from "../util/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import User from "../models/user";
import { Group, Role } from "../models";

const router = express.Router();

router.post("/", async (req, res) => {
  const user = await User.findOne({
    where: { username: req.body.username },
    include: [
      {
        model: Role,
        attributes: ["id", "name"],
        as: "roles",
        through: {
          attributes: [],
        },
      },
      {
        model: Group,
        as: "group",
        attributes: ["id", "name"],
      },
    ],
  });
  if (!user) {
    throw new Error("User does not exist!");
  }
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    throw new Error("Wrong password!");
  }
  const roles = user.roles?.map((role) => role.name);
  const userForToken = {
    username: user.username,
    roles: roles,
    id: user.id,
  };
  const token = jwt.sign(userForToken, config.SECRET);

  res.status(200).send({
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    roles: roles,
    group: user.group
      ? {
          id: user.group.id,
          name: user.group.name,
        }
      : null,
    token,
  });
});
export default router;

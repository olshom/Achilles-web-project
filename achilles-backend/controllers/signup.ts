import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import User from "../models/user";

router.post("/", async (req, res) => {
  const { username, firstName, lastName, password } = req.body;
  console.log(firstName, lastName, password);
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const newUser = await User.create({
    username: username,
    firstName: firstName,
    lastName: lastName,
    password: passwordHash,
  });
  await newUser.setRoles([1]);

  res.json(newUser);
});

export default router;

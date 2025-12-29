import express from "express";
import { Role } from "../models";

const router = express.Router();

router.get("/", async (_req, res) => {
  const roles = await Role.findAll();
  res.json(roles);
});

router.post("/", async (req, res) => {
  const role = await Role.create(req.body);
  res.json(role);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Role.destroy({ where: { id } });
  res.status(204).end();
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const role = await Role.findByPk(id);
  if (!role) {
    res.status(404).json({});
  } else {
    role.name = name;
    const updatedRole = await role.save();
    res.json(updatedRole);
  }
});

export default router;

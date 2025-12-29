import express from "express";
import { Plan } from "../models";

const router = express.Router();

router.get("/", async (_req, res) => {
  const plans = await Plan.findAll();
  res.json(plans);
});

router.post("/", async (req, res) => {
  const newPlan = await Plan.create(req.body);
  res.json(newPlan);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { type, price, description } = req.body;
  const plan = await Plan.findByPk(id);
  if (!plan) {
    res.status(404).end();
  } else {
    plan.type = type;
    plan.price = price;
    plan.description = description;
    const updatedPlan = await plan.save();
    res.json(updatedPlan);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Plan.destroy({ where: { id } });
  res.status(204).end();
});

export default router;

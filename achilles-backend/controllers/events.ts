import express from "express";
import Event from "../models/event";
import { Op } from 'sequelize';
const router = express.Router();

router.post("/", async (req, res) => {
    const event: Event = req.body;
    console.log('I am herse', event);
    const newEvent = await Event.create({
        ...event,
    });
    return res.status(201).json(newEvent);
})

router.get("/", async (_req: express.Request, res: express.Response) => {
    const now = new Date();
    const oneWeek = new Date();
    oneWeek.setDate(oneWeek.getDate() + 7);
    const events = await Event.findAll({
        where: {start: {
                [Op.between]: [now, oneWeek]
            }}
    })
    res.json(events);
})

export default router;
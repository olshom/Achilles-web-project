import express from "express";
import Event from "../models/event";
import { Op } from 'sequelize';
import {Group} from "../models";
const router = express.Router();

router.post("/", async (req, res) => {
    const {eventType, uniform, start, end, description, groupIds} = req.body;
    console.log('I am herse');
    const newEvent = await Event.create({
        eventType: eventType,
        uniform: uniform,
        start: start,
        end: end,
        description: description
    });
    await newEvent.addGroups(groupIds);
    return res.status(201).json(newEvent);
})

router.get("/", async (_req: express.Request, res: express.Response) => {
    const now = new Date();
    const oneWeek = new Date();
    oneWeek.setDate(oneWeek.getDate() + 7);
    const events = await Event.findAll({
        attributes: {exclude: ['description']},
        include: [{
            model: Group,
            as: 'groups',
            through: {
                attributes: []
            }
        }],
        where: {start: {
                [Op.between]: [now, oneWeek]
            }}
    })
    res.json(events);
})

router.get("/:id", async (req: express.Request, res: express.Response) => {
    const {id} = req.params;
    const event = await Event.findByPk(id,{
        include: [{
            model: Group,
            as: 'groups',
            through: {
                attributes: []
            }
        }]
    })
    if (!event) {
        res.status(404).json({error: 'Event not found'})
    }
    res.json(event)
})

export default router;
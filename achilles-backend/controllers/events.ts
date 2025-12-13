import express from "express";
import {Event, Group, User} from "../models";
import {isAdmin, userExtractor} from "../util/middleware";
import {fromZonedTime} from "date-fns-tz";
import {Op} from "sequelize";
const router = express.Router();

router.get("/", async (req, res) => {
    const {start, end} = req.query;
    if (start && end) {
        const events = await Event.findAll({
            attributes: {exclude: []},
            include: [{
                model: User,
                as: 'coach',
                attributes: {
                    exclude: ['password'],
                }
            }, {
                model: Group,
                as: 'groups',
                    through: {
                        attributes: []
                    }
                },
            ],
            where: {start: {
                    [Op.between]: [new Date(start as string).toISOString(), new Date(end as string).toISOString()]
                }}
        });
        const formattedEvents = events.map(event => {
            const eventData = event.toJSON();
            return {
                ...eventData,
                start: event.start.toISOString(),
                end: event.end.toISOString()
            };
        });
        return res.json(formattedEvents);
    } else {
        return res.status(400).json({message: 'No event found.'});
    }
})

const buildDateFromParts = (date: string, time: string, timeZone: string): Date => {
    const pureDate = date.split("T")[0];
    const fullDateStr = `${pureDate}T${time}:00`;
    return fromZonedTime(new Date(fullDateStr), timeZone);
}

router.post("/", userExtractor, isAdmin, async (req, res) => {
    const {title, selectedGroups, uniform, date, startTime, endTime, timeZone} = req.body;
    const newEvent = await Event.create({
        title,
        uniform,
        start: buildDateFromParts(date, startTime, timeZone),
        end: buildDateFromParts(date, endTime, timeZone),
        coachId: req.body.coach ? req.body.coach : null,
        description: req.body.description ? req.body.description : null
    })
    await newEvent.setGroups(selectedGroups);
    return res.status(201).json(newEvent);
})

router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    const event = await Event.findByPk(id);
    if (!event) {
        return res.status(404).json({error: "Schedule not found"});
    }
    await event.setGroups([]);
    await event.destroy();
    return res.status(204).end();
})
export default router;
/*
import express from "express";
import {Schedule, Group, User} from "../models";
import { Op } from 'sequelize';


import {Event} from "../models";
import {isAdmin, userExtractor} from "../util/middleware";

const router = express.Router();


router.post("/", userExtractor, isAdmin, async (req, res) => {
    if (req.body.title && req.body.isRecurring === false ) {
    const {title, isRecurring, selectedGroups, uniform, date, startTime, endTime, timeZone} = req.body;
        const newEvent = await Schedule.create({
            title,
            isRecurring
        })
        await newEvent.setGroups(selectedGroups);
        // @ts-ignore
        const eventEntry = await Event.create({
            eventId: newEvent.id,
            uniform,
            start: buildDateFromParts(date, startTime, timeZone),
            end: buildDateFromParts(date, endTime, timeZone),
            coachId: req.body.coach?req.body.coach:null,
            description: req.body.description ? req.body.description : null
        });
        const fullEvent = await Event.findByPk(eventEntry.id, {
            include: [{
                model: User,
                as: 'coach',
            }, {
                model: Schedule,
                as: 'event',
                include: [{
                    model: Group,
                    as: 'groups',
                    through: {
                        attributes: []
                    }
                }]
            }]
        });
        return res.status(201).json(fullEvent);
    } else if(req.body.isRecurring ) {
        const {title, isRecurring, selectedGroups, uniform, recurringDays, recurringStartDate, recurringEndDate, startTime, endTime, timeZone} = req.body;
        const newEvent = await Schedule.create({
            title,
            isRecurring
        });

        const endDate = new Date(recurringEndDate);
        const recurringStartDateNumber = new Date(recurringStartDate).getDay();
        let diff = 0

        for (let day of recurringDays) {
            console.log('Processing day:', day);
            if (day >= recurringStartDateNumber) {
                diff = day - recurringStartDateNumber;
            } else {
                diff = day - recurringStartDateNumber  + 7;
            }
            const eventDate = new Date(recurringStartDate);
            eventDate.setDate(eventDate.getDate() + diff);
            while (eventDate <= endDate) {
                console.log('Schedule date:', eventDate);
                await Event.create({
                    eventId: newEvent.id,
                    uniform,
                    start: buildDateFromParts(eventDate.toISOString(), startTime, timeZone),
                    end: buildDateFromParts(eventDate.toISOString(), endTime, timeZone),
                    coachId: req.body.coach?req.body.coach:null,
                    description: req.body.description ? req.body.description : null
                });

//                createdEvents.push(newEvent);
                eventDate.setDate(eventDate.getDate() + 7);
            }
        }
        const createdEvents = await Event.findAll({
            include: [
                {
                    model: User,
                    as: 'coach',
                }, {
                    model: Schedule,
                    as: 'event',
                    include: [{
                        model: Group,
                        as: 'groups',
                        through: {
                            attributes: []
                        }
                    }]
                }],
            where: {
                eventId: newEvent.id
            }
        });
        return res.status(201).json(createdEvents);
    } else {
        return res.status(400).json({message: 'Invalid event type'});
    }

})

// @ts-ignore
router.get("/", async (req, res) => {
    const {start, end} = req.query;

    if (start && end) {
        const events = await Event.findAll({
            attributes: {exclude: []},
            include: [{
                model: User,
                as: 'coach'
            }, {
                model: Schedule,
                as: 'event',
                include: [{
                    model: Group,
                    as: 'groups',
                    through: {
                        attributes: []
                    }
                },

                ]
            }],
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
        res.status(400).json({message: 'No event found.'});
    }
})
// i need to separate this logic into 2 parts
router.delete("/:id", async (req: express.Request, res: express.Response) => {
    const {id} = req.params;
    const eventEntry = await Event.findByPk(id)
    if (!eventEntry) {
        res.status(404).json({error: 'Schedule not found'})
    }
    const event = await Schedule.findByPk(eventEntry!.eventId);
    if (!event) {
        res.status(404).json({error: 'Schedule not found'})
    }
    if (event!.isRecurring) {
        await Event.destroy({where: {id}})
        res.status(204).end()
    } else if (!event!.isRecurring) {
        await event!.setGroups([]);
        await Event.destroy({where: {id}})
        await Schedule.destroy({where: {id: event!.id}})
        res.status(204).end()
    }
})

export default router;*/

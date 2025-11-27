import express from "express";
import {Event} from "../models";
import { Op } from 'sequelize';
import {Group} from "../models";
import {fromZonedTime} from "date-fns-tz";
import {EventEntry} from "../models";

const router = express.Router();

const buildDateFromParts = (date: Date, time: Date, timeZone: string): Date => {
    const fullDateStr = `${date}T${time}:00`;
    return fromZonedTime(new Date(fullDateStr), timeZone);
}
router.post("/", async (req, res) => {
    if (req.body.title && req.body.isRecurring === false ) {
    const {title, isRecurring, selectedGroups, uniform, date, startTime, endTime, timeZone} = req.body;
        const newEvent = await Event.create({
            title,
            isRecurring,
            coach: req.body.coach?req.body.coach:null
        })
        await newEvent.setGroups(selectedGroups);
        // @ts-ignore
        const eventEntry = await EventEntry.create({
            eventId: newEvent.id,
            uniform,
            start: buildDateFromParts(date, startTime, timeZone),
            end: buildDateFromParts(date, endTime, timeZone),
            description: req.body.description ? req.body.description : null
        });


        return res.status(201).json(newEvent);
    } /*else if(req.body.eventType && req.body.eventType === 'recurring'){
        const {title, selectedGroups, recurringDays, recurringStartDate, recurringEndDate, startTime, endTime} = req.body;
        const endDate = new Date(recurringEndDate);
        const recurringStartDateNumber = new Date(recurringStartDate).getDay();
        let diff = 0
        const createdEvents = [];
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
                console.log('Event date:', eventDate);
                console.log('Start date:', new Date(`${eventDate.toISOString().split('T')[0]}T${startTime}:00`));
                const newEvent = await Event.create({
                    title,
                    start: new Date(`${eventDate.toISOString().split('T')[0]}T${startTime}:00`),
                    end: new Date(`${eventDate.toISOString().split('T')[0]}T${endTime}:00`),
                });
                await newEvent.setGroups(selectedGroups);
//                console.log('created event', newEvent);
                createdEvents.push(newEvent);
                eventDate.setDate(eventDate.getDate() + 7);
            }
        }
        return res.status(201).json(createdEvents);
    }*/ else {
        return res.status(400).json({message: 'Invalid event type'});
    }
/*    if (req.body.eventType && req.body.eventType === 'recurring' ) {
    const {title, eventType, selectedGroups, recurringDays, recurringStartDate, recurringEndDate, startTime, endTime, recurrencePattern} = req.body;
    }*/
    console.log('I am herse');

})

// @ts-ignore
router.get("/", async (req, res) => {
    const {start, end} = req.query;

    if (start && end) {
        const events = await EventEntry.findAll({
            attributes: {exclude: ['description']},
            include: [{
                model: Event,
                as: 'event',
                include: [{
                    model: Group,
                    as: 'groups',
                    through: {
                        attributes: []
                    }
                }]
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

/*router.get("/:id", async (req: express.Request, res: express.Response) => {
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
})*/

export default router;
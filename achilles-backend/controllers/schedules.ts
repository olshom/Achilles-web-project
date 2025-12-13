import express from "express";
import { Schedule, Event} from "../models";
//import {isAdmin, userExtractor} from "../util/middleware";
import {fromZonedTime} from "date-fns-tz";
const router = express.Router();

const buildDateFromParts = (date: string, time: Date, timeZone: string): Date => {
    const pureDate = date.split("T")[0];
    const fullDateStr = `${pureDate}T${time}:00`;
    return fromZonedTime(new Date(fullDateStr), timeZone);
}

//const recurringDays = ['sunday','monday','tuesday', 'wednesday', 'thursday', 'friday', 'saturday']; // Sunday to Saturday

router.post("/", async (req, res) => {
    const {
        recurringDays, title,
        selectedGroups,
        uniform,
        recurringStartDate,
        recurringEndDate,
        startTime,
        endTime,
        timeZone
    } = req.body;

    const newSchedule = await Schedule.create({
        monday: recurringDays.includes(1),
        tuesday: recurringDays.includes(2),
        wednesday: recurringDays.includes(3),
        thursday: recurringDays.includes(4),
        friday: recurringDays.includes(5),
        saturday: recurringDays.includes(6),
        sunday: recurringDays.includes(0),
        start: new Date(recurringStartDate),
        end: new Date(recurringEndDate)
    })

    const endDate = new Date(recurringEndDate);
    const recurringStartDateNumber = new Date(recurringStartDate).getDay();
    let diff = 0

    for (let day of recurringDays) {
        console.log('Processing day:', day);
        if (day >= recurringStartDateNumber) {
            diff = day - recurringStartDateNumber;
        } else {
            diff = day - recurringStartDateNumber + 7;
        }
        const eventDate = new Date(recurringStartDate);
        eventDate.setDate(eventDate.getDate() + diff);
        while (eventDate <= endDate) {
            console.log('Schedule date:', eventDate);
            const newEvent = await Event.create({
                title,
                scheduleId: newSchedule.id,
                uniform,
                start: buildDateFromParts(eventDate.toISOString(), startTime, timeZone),
                end: buildDateFromParts(eventDate.toISOString(), endTime, timeZone),
                coachId: req.body.coach ? req.body.coach : null,
                description: req.body.description ? req.body.description : null
            });
            await newEvent.setGroups(selectedGroups);
            eventDate.setDate(eventDate.getDate() + 7);
        }
    }
    return res.status(200).json({})
})

router.get("/", async (_req, res) => {
    const schedules = await Schedule.findAll({});
    res.json(schedules);
})
export default router;
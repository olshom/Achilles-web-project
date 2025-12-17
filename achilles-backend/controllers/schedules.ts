import express from "express";
import {Schedule, Group, Event } from "../models";
import {isAdmin, userExtractor} from "../util/middleware";
import {fromZonedTime} from "date-fns-tz";
import { Op } from "sequelize";
const router = express.Router();

const buildDateFromParts = (date: string, time: Date, timeZone: string): Date => {
    const pureDate = date.split("T")[0];
    const fullDateStr = `${pureDate}T${time}:00`;
    return fromZonedTime(new Date(fullDateStr), timeZone);
}

//const recurringDays = ['sunday','monday','tuesday', 'wednesday', 'thursday', 'friday', 'saturday']; // Sunday to Saturday
const createEventsForSchedule = async (scheduleId: number,
                                       recurringStartDate: string,
                                       recurringEndDate:string,
                                       recurringDays:number[],
                                       title:string,
                                       uniform: string,
                                       startTime: Date,
                                       endTime: Date,
                                       timeZone: string,
                                       coach: number | null,
                                       description: string,
                                       selectedGroups: number[]) => {
    const endDate = new Date(recurringEndDate);
    console.log('selectedGroups in createEventsForSchedule:', selectedGroups);
    const recurringStartDateNumber = new Date(recurringStartDate).getDay();
    let diff = 0
    let atLeastOne = false;

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
            console.log('ScheduleWDateUpdate date:', eventDate);
            const startT= buildDateFromParts(eventDate.toISOString(), startTime, timeZone);
            const endT = buildDateFromParts(eventDate.toISOString(), endTime, timeZone);
            console.log('ScheduleWDateUpdate new event:', title, scheduleId, uniform, startT, endT, coach, description);
            const newEvent = await Event.create({
                title,
                scheduleId: scheduleId,
                uniform: uniform,
                start: startT,
                end: endT,
                coachId: coach,
                description: description
            });

            await newEvent.setGroups(selectedGroups);
            atLeastOne = true;
            eventDate.setDate(eventDate.getDate() + 7);
        }
    }
    return atLeastOne;
}

router.post("/", userExtractor, isAdmin, async (req, res) => {
    const {
        recurringDays, title,
        selectedGroups,
        uniform,
        recurringStartDate,
        recurringEndDate,
        startTime,
        endTime,
        timeZone,
        coach,
        description
    } = req.body;
    console.log('Received recurringDays:', req.body);

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

    const scheduleIsNotEmpty = await createEventsForSchedule(newSchedule.id,
        recurringStartDate,
        recurringEndDate,
        recurringDays,
        title,
        uniform,
        startTime,
        endTime,
        timeZone,
        coach,
        description,
        selectedGroups
    );
    if (!scheduleIsNotEmpty) {
        await newSchedule.destroy()
        return res.status(400).json({error: "No events can be created for the given schedule."
        })}

    await newSchedule.setGroupsForEvent(selectedGroups);
    return res.status(200).json(newSchedule)
})

router.get("/", async (_req, res) => {
    const schedules = await Schedule.findAll({
        include: [{
            model: Group,
            as: 'groupsForEvent',
            through: {
                attributes: []
            }
        }]
    });
    res.json(schedules);
})

router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    const deletedSchedule = await Schedule.findByPk(id);
    if (!deletedSchedule) {
        return res.status(404).end();
    }
    const events = await Event.findAll({where: {scheduleId: id}})
    for (let event of events) {
        await event.setGroups([]);
        await event.destroy();
    }
    await deletedSchedule.setGroupsForEvent([]);
    await deletedSchedule.destroy()
    return res.status(204).end()
})

router.put("/:id", async (req, res) => {
    const {id} = req.params;
    const { recurringEndDate, timeZone} = req.body;
    console.log('Received newEndDate:', timeZone);
    const schedule = await Schedule.findByPk(id)

    if (!schedule) {
        return res.status(404).end()
    } else {
        console.log('schedule.end:', schedule.end, typeof schedule.end);
        console.log('newEndDate:', recurringEndDate, typeof recurringEndDate);
        if (new Date(recurringEndDate) < schedule.end) {
            const events = await Event.findAll({
                where: {
                    scheduleId: id,
                    end: {
                        [Op.gt]: new Date(recurringEndDate)
                    }
                }
            })
            for (let event of events) {
                await event.setGroups([]);
                await event.destroy();
            }
        } else if (new Date(recurringEndDate) > schedule.end) {
            //I need to create events however currently I don't have all the data needed to create events again
            return res.status(400).end()
        }
            schedule.end = new Date(recurringEndDate);
            const updatedSchedule = await schedule.save()
        await updatedSchedule.reload({
            include: [{
                model: Group,
                as: 'groupsForEvent',
                through: {
                    attributes: []
                }
            }]
        })
        return res.status(200).json(updatedSchedule)
    }
})
export default router;
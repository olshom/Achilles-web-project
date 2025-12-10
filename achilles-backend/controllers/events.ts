import express from "express";
import {Event, EventEntry} from "../models";
//import {isAdmin, userExtractor} from "../util/middleware";

const router = express.Router();

router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    const event = await Event.findByPk(id);
    if (!event) {
        return res.status(404).json({error: "Event not found"});
    }
    await event.setGroups([]);
    await EventEntry.destroy({where: {eventId: event.id}});
    await event.destroy();
    return res.status(204).end();
})

export default router;
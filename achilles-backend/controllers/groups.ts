import express from "express";
import Group from "../models/group";

const router = express.Router();

router.get('/', async (_req, res) => {
    const groups = await Group.findAll()
    res.json(groups)
})

router.post('/', async (req, res) => {
    const newGroup = await Group.create(req.body)
    res.json(newGroup)
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    await Group.destroy({where: {id}})
    res.status(204).end()
})

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {name, description} = req.body;
    const group = await Group.findByPk(id)
    if (!group) {
        res.status(404).end()
    } else {
        group.name = name;
        group.description = description;
        const updatedGroup = await group.save()
        res.json(updatedGroup)
    }
})

export default router;
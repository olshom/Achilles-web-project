import express from 'express';
import {Achievement, User} from "../models";

const router = express.Router();

router.get('/', async (_req, res) => {
    const achievements = await Achievement.findAll({
        attributes: {
            exclude: ['userId'],
        },
        include: [
            {
                model: User,
                as: 'user',
                attributes: {
                    exclude: ['password'],
                }
            }
        ]
    });
    res.json(achievements);
})

router.post('/', async (req, res) => {
    const {userId, type, description, date} = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
        res.status(400).json({})
    } else {
        const achievement = await user.createAchievement({type, description, date});
        await achievement.reload({attributes: {
                exclude: ['userId'],
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: {
                        exclude: ['password'],
                    }
                }
            ]})
        res.json(achievement);
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const achievement = await Achievement.findByPk(id, {
        attributes: {
            exclude: ['userId'],
        },
        include: [
            {
                model: User,
                as: 'user',
                attributes: {
                    exclude: ['password'],
                }
            }
        ]
    })
    if (!achievement) {
        res.status(400).json({})
    } else {
        res.json(achievement);
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    await Achievement.destroy({where: {id}})
    res.status(204).end()
})

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const achievement = await Achievement.findByPk(id)
    if (!achievement) {
        res.status(404).json({})
    }else {
        Object.assign(achievement, req.body as Partial<Achievement>)
        await achievement.save()
        const updated = await Achievement.findByPk(id, {
            attributes: {
                exclude: ['userId'],
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: {
                        exclude: ['password'],
                    }
                }
            ]
        })
        res.json(updated);
    }
})

export default router;
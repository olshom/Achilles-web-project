import express from 'express';
import {User, Achievement, Role, Plan, Group, Event } from "../models";
import bcrypt from 'bcrypt';
//import {Op} from "sequelize";

const router = express.Router();

router.get('/', async (_req, res) => {
    const users = await User.findAll({
        attributes: {exclude: ['planId', 'PlanId', 'GroupId', 'groupId']},
        include: [
            {
                model: Role,
                attributes: ['id', 'name'],
                as: 'roles',
                through: {
                    attributes: [],
                }
            },
            {
                model: Plan,
                as: 'plan',
                attributes: ['id', 'type'],
            },
            {
                model: Group,
                as: 'group',
                attributes: ['id', 'name'],
            }
            ]}
    )
    res.json(users)
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const now = new Date();
    const oneWeek = new Date();
    oneWeek.setDate(now.getDate() + 7);
    const user = await User.findByPk(id, {
        attributes: {exclude: ['planId', 'PlanId', /*'GroupId', 'groupId'*/]},
        include: [
            {
                model: Plan,
                as: 'plan',
            },
            {
                model: Group,
                as: 'group',
                attributes: ['id', 'name'],
                include: [
                    {
                        model: Event,
                        as: 'events',
/*                        where: {start: {
                                [Op.between]: [now, oneWeek]
                            }},*/
                        through: {
                            attributes: [],
                        }
                    }

                ]
            },
            {
                model: Achievement,
                as: 'achievements',
                attributes: {exclude: ['userId']}
            }],
    })
    console.log('associations',User.associations);

    if (!user) {
        res.status(404).json({error: 'User not found'})
    }
    res.json(user)
})

router.put('/:id/password', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id)
    if (!user) {
        res.status(404).json({error: 'User not found'})
    } else
    {
        const {username, password} = req.body;
        user.username = username
        const saltRounds = 10
        user.password = await bcrypt.hash(password, saltRounds)
        await user.save()
        res.json(user)
    }

})
export default router;
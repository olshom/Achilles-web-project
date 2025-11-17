import { config } from '../util/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express';
import User from "../models/user";
import {Role} from "../models";

const router = express.Router();

// async function validatePassword(inputPassword: string, storedHash: string): Promise<boolean> {
//     const isMatch = await bcrypt.compare(inputPassword, storedHash); // Compare the input password with the hashed password
//     return isMatch; // Return the result of the comparison
// }


router.post('/', async (req, res) => {
    const user = await User.findOne({
        where: { username: req.body.username },
    include: [            {
        model: Role,
        attributes: ['id', 'name'],
        as: 'roles',
        through: {
            attributes: [],
        }
    }]});
    if (!user ) {
        throw new Error('User does not exist!');
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        throw new Error('Wrong password!');
    }
    const userForToken = {
        username: user.username,
        id: user.id
    }
    const token = jwt.sign(userForToken, config.SECRET)

    const roles = user.roles?.map((role) => role.name);

    res
        .status(200)
        .send({ token, username: user.username, name: user.firstName, roles: roles })
})
export default router;
import jwt from 'jsonwebtoken';
import {User, Role} from '../models';
import { config } from '../util/config';
import { Request, Response, NextFunction } from 'express';


interface DecodedToken {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    roles: string[];
}
const tokenExtractor = (req: Request) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return '';
}

interface MyRequest extends Request {
    user?: User | null;
}

const userExtractor = async (req: MyRequest, res: Response, next: NextFunction) => {
    const decodedToken = jwt.verify(tokenExtractor(req), config.SECRET) as DecodedToken;

    if (!decodedToken.id) {
        res.status(401).json({ error: 'token invalid' })
    } else {
        req.user = await User.findByPk(decodedToken.id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Role,
                    attributes: ['id', 'name'],
                    as: 'roles',
                    through: {
                        attributes: [],
                    }
                }
            ]
        })
        if (!req.user) {
            res.status(401).json({ error: 'user not found' })
        }
    }
    next()
}

const isAdmin = (req: MyRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.roles?.find(role => role.name === 'admin')) {
        next();
    } else {
        res.status(403).json({ error: 'forbidden' });
    }
}
export {
    tokenExtractor,
    userExtractor,
    isAdmin
}
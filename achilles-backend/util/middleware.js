import jwt from "jsonwebtoken";
import { User, Role } from "../models";
import { config } from "../util/config";
const tokenExtractor = (req) => {
    const authorization = req.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
        return authorization.replace("Bearer ", "");
    }
    return "";
};
const userExtractor = async (req, res, next) => {
    const decodedToken = jwt.verify(tokenExtractor(req), config.SECRET);
    if (!decodedToken.id) {
        res.status(401).json({ error: "token invalid" });
    }
    else {
        req.user = await User.findByPk(decodedToken.id, {
            attributes: { exclude: ["password"] },
            include: [
                {
                    model: Role,
                    attributes: ["id", "name"],
                    as: "roles",
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
        if (!req.user) {
            res.status(401).json({ error: "user not found" });
        }
    }
    next();
};
const isAdmin = (req, res, next) => {
    if (req.user && req.user.roles?.find((role) => role.name === "admin")) {
        next();
    }
    else {
        res.status(403).json({ error: "forbidden" });
    }
};
export { tokenExtractor, userExtractor, isAdmin };

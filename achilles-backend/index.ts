import express from "express";
const app = express();
app.use(express.json());
import connectToDatabase from "./util/db";
import usersRouter from "./controllers/users";
import loginRouter from "./controllers/login";

import signupRouter from "./controllers/signup";
import achievementsRouter from "./controllers/achievements";
import rolesRouter from "./controllers/roles";
import groupsRouter from "./controllers/groups";
import plansRouter from "./controllers/plans";
import eventsRouter from "./controllers/events";
import schedulesRouter from "./controllers/schedules";
import { config } from "./util/config";

app.get("/ping", (_req, res) => {
  res.send("pong");
});
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/schedules", schedulesRouter);
app.use("/api/events", eventsRouter);
app.use("/api/signup", signupRouter);
app.use("/api/achievements", achievementsRouter);
app.use("/api/roles", rolesRouter);
app.use("/api/groups", groupsRouter);
app.use("/api/plans", plansRouter);
app.use(express.static("dist"));

const port = config.PORT;

const start = async () => {
  await connectToDatabase();
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
};

void start();

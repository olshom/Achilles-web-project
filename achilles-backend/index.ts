import express from 'express';
const app = express();
app.use(express.json());
import connectToDatabase from "./util/db";
import userRouter from "./controllers/users";
import loginRouter from "./controllers/login";
import eventEntriesRouter from "./controllers/eventEntries";
import signupRouter from "./controllers/signup";
import achievementsRouter from "./controllers/achievements";
import rolesRouter from "./controllers/roles";
import groupsRouter from "./controllers/groups";
import plansRouter from "./controllers/plans";
import eventsRouter from "./controllers/events";

const PORT = process.env.PORT || 3003;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/eventEntries', eventEntriesRouter);
app.use('/api/events', eventsRouter);
app.use('/api/signup', signupRouter);
app.use('/api/achievements', achievementsRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/plans', plansRouter);

const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

start()
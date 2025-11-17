import express from 'express';
const app = express();
app.use(express.json());
import connectToDatabase from "./util/db";
import userRouter from "./controllers/users";
import loginRouter from "./controllers/login";
import eventRouter from "./controllers/events";
import signupRouter from "./controllers/signup";
import achievementsRouter from "./controllers/achievements";
import rolesRouter from "./controllers/roles";

const PORT = process.env.PORT || 3003;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/events', eventRouter);
app.use('/api/signup', signupRouter);
app.use('/api/achievements', achievementsRouter)
app.use('/api/roles', rolesRouter)

const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

start()
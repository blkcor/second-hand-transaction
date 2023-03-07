import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routers/users.js'
import authRouter from './routers/auth.js'
const { PORT } = dotenv.config().parsed
const app = express();

//middle ware
app.use(express.json())


app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

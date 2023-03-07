import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routers/users.js'
import authRouter from './routers/auth.js'
import commodityRouter from './routers/commodities.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'




const { PORT } = dotenv.config().parsed
const app = express();
//middle ware
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',
}))
app.use(cookieParser())

//router
app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use('/api/commodities', commodityRouter)

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

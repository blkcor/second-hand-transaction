import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routers/users.js'
import authRouter from './routers/auth.js'
import commodityRouter from './routers/commodities.js'
import collectionRouter from './routers/collections.js'

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

//routers
app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use('/api/commodities', commodityRouter)
app.use('/api/collections', collectionRouter)
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

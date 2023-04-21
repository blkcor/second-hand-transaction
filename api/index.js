import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routers/users.js'
import authRouter from './routers/auth.js'
import commodityRouter from './routers/commodities.js'
import collectionRouter from './routers/collections.js'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import multer from 'multer'



const { PORT } = dotenv.config().parsed
const app = express();

//storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage: storage })
//middle ware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
}))
app.use(cookieParser())


//routers
app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use('/api/commodities', commodityRouter)
app.use('/api/collections', collectionRouter)
app.use('/api/upload', upload.single('file'), (req, res) => {
  const file = req.file
  res.status(200).json(file.filename)
})

//start
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

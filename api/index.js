import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routers/users.js'
import authRouter from './routers/auth.js'
import productRouter from './routers/products.js'
import collectionRouter from './routers/collections.js'
import followsRouter from './routers/follows.js'
import shoppingRouter from './routers/shopping.js'
import commentsRouter from './routers/comments.js'
import ordersRouter from './routers/orders.js'
import opRouter from './routers/op.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import multer from 'multer'
import "./websocket.js"




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
  origin: '*',
}))
app.use(cookieParser())


//routers
app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use('/api/products', productRouter)
app.use('/api/collections', collectionRouter)
app.use('/api/follows', followsRouter)
app.use('/api/carts', shoppingRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/op', opRouter)
//single file upload
app.use('/api/upload', upload.single('file'), (req, res) => {
  const file = req.file
  res.status(200).json(file.filename)
})

app.use('/api/uploads', upload.array('files'), (req, res) => {
  const files = req.files
  res.status(200).json(files.map(file => file.filename))
})      //multiple file upload


//start
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

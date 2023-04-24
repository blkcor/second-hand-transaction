import express from 'express'
import { addCart } from '../controller/shopping.js'
const router = express.Router()

router.post('/add', addCart)

export default router

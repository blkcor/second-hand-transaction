import express from 'express'
import { createOp, getOp,publishNotification } from '../controller/op.js'

const router = express.Router()
router.post("/", createOp)
router.get("/:orderId", getOp)
router.put("/notification", publishNotification)
export default router

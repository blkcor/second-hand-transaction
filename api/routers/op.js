import express from 'express'
import { createOp, getOp,publishNotification,getNotification } from '../controller/op.js'

const router = express.Router()
router.post("/", createOp)
router.get("/:orderId", getOp)
router.get("/notification/get", getNotification)
router.put("/notification", publishNotification)

export default router

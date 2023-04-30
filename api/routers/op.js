import express from 'express'
import { createOp, getOp } from '../controller/op.js'

const router = express.Router()
router.post("/", createOp)
router.get("/:orderId", getOp)
export default router

import express from 'express'
import { createOp } from '../controller/op.js'

const router = express.Router()
router.post("/", createOp)

export default router

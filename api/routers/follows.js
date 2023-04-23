import express from 'express'
import { getFollows, getFollow, createFollow, deleteFollow } from '../controller/follows.js'

const router = express.Router()
router.post("/", createFollow)
router.get("/", getFollows)
router.get("/:id", getFollow)
router.delete("/:id", deleteFollow)


export default router

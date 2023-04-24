import express from 'express'
import { getFollows, getFollow, createFollow, deleteFollow, isMutualed } from '../controller/follows.js'

const router = express.Router()
router.post("/", createFollow)
router.get("/", getFollows)
router.get("/:id", getFollow)
router.delete("/:id", deleteFollow)
router.get("/mutualed/:id", isMutualed)


export default router

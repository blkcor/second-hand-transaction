import express from 'express'
import { getComments, createComment, deleteComment } from '../controller/comments.js'

const router = express.Router()

router.post("/", createComment)
router.get("/:id", getComments)
router.delete("/:id", deleteComment);


export default router

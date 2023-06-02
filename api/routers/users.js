import express from 'express'
import { getUser, updateUser, getUsers, searchUsers,getAllUsers } from '../controller/users.js'
const router = express.Router()

router.get('/find/:userId', getUser)
router.put('/', updateUser)
router.get('/find', getUsers)
router.get('/all', getAllUsers)
router.get('/search/:username', searchUsers)

export default router

import express from 'express'
import { getUser, updateUser, getUsers, searchUsers,getAllUsers,deleteUser,adminAddUser } from '../controller/users.js'
const router = express.Router()

router.post("/adminAdd",adminAddUser)
router.get('/find/:userId', getUser)
router.put('/', updateUser)
router.get('/find', getUsers)
router.get('/all', getAllUsers)
router.get('/search/:username', searchUsers)
router.delete('/:userId', deleteUser)

export default router

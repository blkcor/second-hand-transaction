import express from 'express'
import { getUser, updateUser, getUsers, searchUsers,getAllUsers,deleteUser,adminAddUser,changeUserRole } from '../controller/users.js'
const router = express.Router()

router.post("/adminAdd",adminAddUser)
router.get('/find/:userId', getUser)
router.put('/', updateUser)
router.put('/changeRole', changeUserRole)
router.get('/find', getUsers)
router.get('/all', getAllUsers)
router.get('/search/:username', searchUsers)
router.delete('/:userId', deleteUser)

export default router

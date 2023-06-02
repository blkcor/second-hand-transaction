import express from 'express'
import { createOrder, getOrders, getOrder, updateOrder, deleteOrder, updateAddress,updateStatus } from '../controller/orders.js'
const router = express.Router()

router.post('/', createOrder)
router.get('/getByUserId', getOrders)
router.get('/:id', getOrder)
router.put('/', updateOrder)
router.put('/updateStatus', updateStatus)
router.put("/updateAddress", updateAddress)
router.delete('/:id', deleteOrder)

export default router

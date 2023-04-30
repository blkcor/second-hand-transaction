import express from 'express'
import { createOrder, getOrders, getOrder, updateOrder, deleteOrder, updateAddress } from '../controller/orders.js'
const router = express.Router()

router.post('/', createOrder)
router.get('/', getOrders)
router.get('/:id', getOrder)
router.put('/', updateOrder)
router.put("/updateAddress", updateAddress)
router.delete('/:id', deleteOrder)

export default router

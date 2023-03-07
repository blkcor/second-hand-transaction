import express from 'express'
import { createOrder, getOrders, getOrder, updateOrder, deleteOrder } from '../controller/orders.js'
const router = express.Router()

router.post('/', createOrder)
router.get('/', getOrders)
router.get('/:id', getOrder)
router.put('/', updateOrder)
router.delete('/:id', deleteOrder)

export default router

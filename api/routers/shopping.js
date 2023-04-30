import express from 'express'
import { addCart, getCarts, removeCart, removeBatch } from '../controller/shopping.js'
const router = express.Router()

router.delete("/carts/removeBatch", removeBatch)
router.post('/add', addCart)
router.get('/', getCarts)
router.delete('/:id', removeCart)

export default router

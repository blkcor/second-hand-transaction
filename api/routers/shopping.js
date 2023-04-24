import express from 'express'
import { addCart, getCarts, removeCart } from '../controller/shopping.js'
const router = express.Router()

router.post('/add', addCart)
router.get('/', getCarts)
router.delete('/:id', removeCart)
export default router

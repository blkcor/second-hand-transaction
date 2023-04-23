import express from 'express'
import { getProducts, getDetail, publishproduct, deleteproduct, getProductsByIds } from '../controller/products.js'
const router = express.Router()

router.post('/', publishproduct)
router.get('/', getProducts)
router.get('/getByIds', getProductsByIds)
router.get('/:id', getDetail)
router.delete('/:id', deleteproduct)

//TODO:
export default router

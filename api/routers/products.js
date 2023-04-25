import express from 'express'
import { getProducts, getDetail, publishproduct, deleteproduct, getProductsByIds, searchProduct } from '../controller/products.js'
const router = express.Router()

router.post('/', publishproduct)
router.get('/', getProducts)
router.get('/getByIds', getProductsByIds)
router.get('/:id', getDetail)
router.delete('/:id', deleteproduct)
//根据搜索内容模糊查询
router.get('/search/:keyword', searchProduct)



//TODO:
export default router

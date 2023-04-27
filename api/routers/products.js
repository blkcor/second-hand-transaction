import express from 'express'
import { getProducts, getDetail, publishproduct, getByUserId, deleteproduct, getAllProducts, updateProduct, getProductsByIds, searchProduct } from '../controller/products.js'
const router = express.Router()

router.post('/', publishproduct)
router.get('/', getProducts)
router.get('/getByIds', getProductsByIds)
router.get('/getByUserId/:userId', getByUserId)
router.get('/getAllproducts', getAllProducts)
//根据搜索内容模糊查询
router.get('/search/:keyword', searchProduct)
router.get('/:id', getDetail)
router.delete('/:id', deleteproduct)
//修改商品信息
router.put('/:id', updateProduct)




//TODO:
export default router

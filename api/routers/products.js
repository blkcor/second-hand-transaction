import express from 'express'
import {
  lockProduct, getProducts,
  getDetail, publishproduct,
  getByUserId, deleteproduct,
  getAllProducts, updateProduct,
  getProductsByIds, searchProduct
} from '../controller/products.js'
const router = express.Router()

router.post('/', publishproduct)
router.get('/', getProducts)
router.get('/getByIds', getProductsByIds)
router.get('/getByUserId/:userId', getByUserId)
router.get('/getAllproducts', getAllProducts)
//根据搜索内容模糊查询
router.get('/search/:keyword', searchProduct)
router.get('/:id', getDetail)

//修改商品信息
router.put('/lock', lockProduct)
router.put('/:id', updateProduct)

router.delete('/:id', deleteproduct)



//TODO:
export default router

import express from 'express'
import { getComodities, getDetail, publishCommodity, deleteCommodity } from '../controller/commodities.js'
const router = express.Router()

router.post('/', publishCommodity)
router.get('/', getComodities)
router.get('/:id', getDetail)
router.delete('/:id', deleteCommodity)

//TODO:
export default router

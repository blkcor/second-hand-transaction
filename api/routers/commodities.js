import express from 'express'
import { getComodities, getDetail, publishCommodity } from '../controller/commodities.js'
const router = express.Router()

router.post('/', publishCommodity)
router.get('/', getComodities)
router.get('/:id', getDetail)

export default router

import express from 'express'
import { getCollections, createCollection, deleteCollection } from '../controller/collections.js'
const router = express.Router()

router.post('/', createCollection)
router.get('/', getCollections)
router.delete('/:productId', deleteCollection)

export default router

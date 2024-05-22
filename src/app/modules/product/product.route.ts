import express from 'express'
import { ProductController } from './product.controller'
const router = express.Router()

router.post('/', ProductController.createProduct)
router.get('', ProductController.searchProduct)
router.get('/', ProductController.getProducts)
router.get('/:productId', ProductController.getProductOne)
router.delete('/:productId', ProductController.deleleProductOne)

router.put('/:productId', ProductController.updateProductOne)

export const ProductRoutes = router

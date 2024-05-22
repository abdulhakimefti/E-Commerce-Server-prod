import { Request, Response } from 'express'
import productValidationSchema from './product.validator'
import { ProductService } from './product.service'

const createProduct = async (req: Request, res: Response) => {
  try {
    //product
    const product = req.body
    //zod validation
    const validateProduct = productValidationSchema.parse(product)
    //service func
    const result = await ProductService.createProductIntoDB(validateProduct)

    //response

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err || 'Something went wrong',
      error: err,
    })
  }
}

const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getProductsFromDB()
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err || 'Something went wrong',
      error: err,
    })
  }
}

const getProductOne = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getProductOneFromDB(
      req.params.productId,
    )
    res.status(200).json({
      success: true,
      message: ' Product fetched successfully!',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err || 'Something went wrong',
      error: err,
    })
  }
}

const updateProductOne = async (req: Request, res: Response) => {
  try {
    const updatedProduct = req.body
    const validateUpdatedProduct = productValidationSchema.parse(updatedProduct)
    const result = await ProductService.updateProductOneFromDB(
      req.params.productId,
      validateUpdatedProduct,
    )

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err || 'Something went wrong',
      error: err,
    })
  }
}

const deleleProductOne = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.deleteProductOneFromDB(
      req.params.productId,
    )
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err || 'Something went wrong',
      error: err,
    })
  }
}

const searchProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.searchProductFromDB(
      req.query.searchTerm as string,
    )
    res.status(200).json({
      success: true,
      message: `Products matching search term '${req.query.searchTerm}' fetched successfully!`,
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err || 'Something went wrong',
      error: err,
    })
  }
}

export const ProductController = {
  createProduct,
  getProducts,
  getProductOne,
  updateProductOne,
  deleleProductOne,
  searchProduct,
}

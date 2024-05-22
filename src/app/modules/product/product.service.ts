import { OrderController } from '../order/order.controller'
import { TOrder } from '../order/order.interface'
import { TInventory, TProduct } from './product.interface'
import { Product } from './product.model'

const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product)
  return result
}

const getProductsFromDB = async () => {
  const result = await Product.find()
  return result
}

const getProductOneFromDB = async (params: string) => {
  const result = await Product.findById(params)
  return result
}

const updateProductOneFromDB = async (
  params: string,
  updateProduct: TProduct,
) => {
  const result = await Product.findByIdAndUpdate(params, updateProduct)
  return result
}

const deleteProductOneFromDB = async (params: string) => {
  const result = await Product.findByIdAndDelete(params)
  return result
}

const searchProductFromDB = async (q: string) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { category: { $regex: q, $options: 'i' } },
    ],
  })
  return result
}

const updateProductOnOrder = async (order: TOrder) => {
  const product: TProduct = (await Product.findById(
    order.productId,
  )) as TProduct
  if (product.inventory.inStock === true) {
    if (product.inventory.quantity >= order.quantity) {
      //update
      const updatedInventory: TInventory = {
        quantity: product.inventory.quantity - order.quantity,
        inStock:
          product.inventory.quantity - order.quantity == 0 ? false : true,
      }
      await Product.findByIdAndUpdate(order.productId, {
        $set: { inventory: updatedInventory },
      })
      OrderController.isAvailable(true)
    }
  } else {
    OrderController.isAvailable(false)
  }
}

export const ProductService = {
  createProductIntoDB,
  getProductsFromDB,
  getProductOneFromDB,
  updateProductOneFromDB,
  deleteProductOneFromDB,
  searchProductFromDB,
  updateProductOnOrder,
}

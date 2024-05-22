import { Request, Response } from 'express'
import { OrderService } from './order.service'
import { orderValidationSchema } from './order.validator'
import { ProductService } from '../product/product.service'

let available = true
async function isAvailable(p: boolean) {
  available = await p
}
const createNewOrder = async (req: Request, res: Response) => {
  try {
    await ProductService.updateProductOnOrder(req.body)
    if (available) {
      const order = req.body
      //zod validation
      const validateOrder = orderValidationSchema.parse(order)
      const result = await OrderService.createNewOrderFromDB(validateOrder)
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: result,
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      })
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Order not found',
    })
  }
}

const getAllOrder = async (req: Request, res: Response) => {
  try {
    if (Object.keys(req.query).length > 0) {
      try {
        const result = await OrderService.getOrderOneFromDB(
          req.query.email as string,
        )
        res.status(200).json({
          success: true,
          message: 'Orders fetched successfully for user email!',
          data: result,
        })
      } catch (err) {
        res.status(500).json({
          success: false,
          message: err || 'Something went wrong',
          error: err,
        })
      }
    } else {
      const result = await OrderService.getAllOrderFromDB()
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err || 'Something went wrong',
      error: err,
    })
  }
}

export const OrderController = {
  createNewOrder,
  getAllOrder,
  isAvailable,
}

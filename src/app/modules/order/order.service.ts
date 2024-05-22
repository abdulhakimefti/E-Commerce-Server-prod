import { TOrder } from './order.interface'
import { Order } from './order.model'

const createNewOrderFromDB = async (order: TOrder) => {
  const result = await Order.create(order)
  return result
}

const getAllOrderFromDB = async () => {
  const result = await Order.find()
  return result
}

const getOrderOneFromDB = async (q: string) => {

  const result = await Order.find({ email: { $regex: q ,$options: 'i'} })
 
  return result
}

export const OrderService = {
  createNewOrderFromDB,
  getAllOrderFromDB,
  getOrderOneFromDB,
}

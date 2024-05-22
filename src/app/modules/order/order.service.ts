import { TOrder } from './order.interface'
import { Order } from './order.model'

const createNewOrderFromDB = async (order: TOrder) => {
  const result = Order.create(order)
  return result
}

const getAllOrderFromDB = async () => {
  const result = Order.find()
  return result
}

const getOrderOneFromDB = async (q: string) => {
  const result = Order.find({ email: { $regex: q } })
  return result
}

export const OrderService = {
  createNewOrderFromDB,
  getAllOrderFromDB,
  getOrderOneFromDB,
}

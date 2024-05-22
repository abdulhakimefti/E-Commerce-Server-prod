import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/product/product.route'
import { OrderRoutes } from './app/modules/order/order.route'

//initializing
const app: Application = express()

//parser
app.use(express.json())
app.use(express.text())

//middlewire
app.use(cors())

//application
app.use('/api/products', ProductRoutes)
app.use('/api/orders', OrderRoutes)

//default route
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running properly!!')
})
app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})
export default app

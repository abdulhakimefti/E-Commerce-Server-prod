import { z } from 'zod'

const variantsValidationSchema = z.object({
  type: z.string().min(1).max(99),
  value: z.string().min(1).max(99),
})

const inventoryValidationSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
})

const productValidationSchema = z.object({
  name: z.string().min(1).max(99),
  description: z.string().min(15).max(200),
  price: z.number(),
  category: z.string().min(1).max(99),
  tags: z.string().array(),
  variants: z.array(variantsValidationSchema),
  inventory: inventoryValidationSchema,
})

export default productValidationSchema

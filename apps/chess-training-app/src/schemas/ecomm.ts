import { z } from 'zod'

export const PurchaseSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
})

export type PurchaseData = z.infer<typeof PurchaseSchema>

export const SubscriptionActionSchema = z.object({
  action: z.literal('create_checkout'),
})

export type SubscriptionActionData = z.infer<typeof SubscriptionActionSchema>

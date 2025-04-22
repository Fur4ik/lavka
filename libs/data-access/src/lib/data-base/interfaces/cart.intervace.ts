import { Product } from "../../products"

export interface CartPayload {
  product: Product
  count: number,
}
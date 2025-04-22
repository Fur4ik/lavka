import { cartFeature } from "./reducer"
import { createSelector } from "@ngrx/store"

export const selectCart = createSelector(
  cartFeature.selectCart,
  (cart) => cart
)
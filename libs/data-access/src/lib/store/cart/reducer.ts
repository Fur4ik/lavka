import { CartPayload } from "../../../index"
import { createFeature, createReducer, on } from "@ngrx/store"
import { cartActions } from "./actions"

export interface CartState {
  cart: CartPayload[]
}

export const initialState: CartState = {
  cart: []
}

export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialState,
    on(cartActions.loadCart, (state, payload) =>{
      return {
        ...state,
        cart: payload.cart
      }
    }),
  )
})

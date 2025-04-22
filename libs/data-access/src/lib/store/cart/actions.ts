import { createActionGroup, props } from "@ngrx/store"
import { CartPayload } from "../../../index"

export const cartActions = createActionGroup({
  source: 'cart',
  events:{
    'add product': props<{payload: CartPayload, typeAdd?: string}>(),
    'remove product': props<{payload: CartPayload}>(),

    'remove cart': props<{cart?: CartPayload[]}>(),

    'load cart': props<{cart: CartPayload[]}>(),
    'refresh cart': props<{cart?: CartPayload[]}>(),
  }
})


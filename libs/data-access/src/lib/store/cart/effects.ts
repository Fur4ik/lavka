import { inject, Injectable } from "@angular/core"
import { CartService } from "../../data-base"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { cartActions } from "./actions"
import { map, switchMap } from "rxjs"

@Injectable({
  providedIn: 'root',
})
export class CartEffects {
  cartService = inject(CartService)
  actions$ = inject(Actions)

  addProduct = createEffect(()=>{
    return this.actions$.pipe(
      ofType(cartActions.addProduct),
      switchMap((product) => {
        return this.cartService.addToCart(product.payload, product.typeAdd)
      }),
      map(cart => cartActions.refreshCart({cart}))
    )
  })

  removeProduct = createEffect(()=>{
    return this.actions$.pipe(
      ofType(cartActions.removeProduct),
      switchMap(product=>{
        return this.cartService.removeFromCart(product.payload)
      }),
      map(cart => cartActions.loadCart({cart}))
    )
  })

  removeCart = createEffect(()=>{
    return this.actions$.pipe(
      ofType(cartActions.removeCart),
      switchMap(()=>{
        return this.cartService.removeCart()
      }),
      map(() => cartActions.loadCart({cart: []}))
    )
  })
  
  refreshCart = createEffect(()=>{
    return this.actions$.pipe(
      ofType(cartActions.refreshCart),
      switchMap(() => {
        return this.cartService.getCart()
      }),
      map((res) => cartActions.loadCart({ cart: res }))
    )
  })

}

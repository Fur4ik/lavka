import { Injectable } from "@angular/core"
import { CartPayload } from "../interfaces/cart.intervace"
import { Observable, of } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class CartService {
  addToCart(payload: CartPayload, type?: string) {
    const cartStorage = localStorage.getItem("cart")
    if(!cartStorage) {
      localStorage.setItem("cart", JSON.stringify([payload]))
      return of()
    }

    const cart: CartPayload[] = JSON.parse(cartStorage)
    let isFound = false
    cart.forEach(prod=>{
      if(prod.product.id === payload.product.id && prod.product.categoryId === payload.product.categoryId){
        if(type === 'cart'){
          prod.count = payload.count
        } else{
          prod.count += payload.count
        }
        isFound = true
        return
      }
    })
    if(!isFound) {
      cart.push(payload)
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    return of(JSON.parse(localStorage.getItem("cart")!))
  }


  removeFromCart(payload: CartPayload) {
    const cartStorage = localStorage.getItem("cart");
    if (!cartStorage) return of([]);

    const cart: CartPayload[] = JSON.parse(cartStorage);

    const productIndex = cart.findIndex(prod =>
      prod.product.id === payload.product.id &&
      prod.product.categoryId === payload.product.categoryId);

    if (productIndex === -1) {
      return of(cart);
    }

    cart.splice(productIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    return of(cart);
  }

  getCart(): Observable<CartPayload[]> {
    const cart = localStorage.getItem("cart")
    if (!cart) return of()
    return of(JSON.parse(cart))
  }

  removeCart(){
    const cartStorage = localStorage.getItem("cart")
    if(!cartStorage) return of()
    localStorage.removeItem("cart")
    return of([])
  }
}

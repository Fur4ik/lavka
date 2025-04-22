import { ChangeDetectionStrategy, Component, inject, Signal } from "@angular/core"
import { CommonModule } from "@angular/common"
import { CartProductListComponent } from "../cart-product-list/cart-product-list.component"
import { firstValueFrom } from "rxjs"
import { cartActions, cartFeature, CartPayload, CartService, ModalService, selectCart } from "@lavka/data-access"
import { Store } from "@ngrx/store"
import { CartFooterComponent } from "../cart-footer/cart-footer.component"
import { CartOrderModalComponent } from "../cart-order-modal/cart-order-modal.component"
import { CategoryListComponent, ConfirmationModalComponent } from "@lavka/common-ui"

@Component({
  selector: "lv-cart-page",
  imports: [CommonModule, CartProductListComponent, CartFooterComponent, CategoryListComponent],
  templateUrl: "./cart-page.component.html",
  styleUrl: "./cart-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPageComponent {
  store = inject(Store)
  modalService = inject(ModalService)

  products: Signal<CartPayload[]> = this.store.selectSignal(selectCart)

  constructor() {
    this.store.dispatch(cartActions.refreshCart({}))
  }

  async toOrder(toggle: boolean) {
    if (toggle) {
      this.modalService.show(CartOrderModalComponent)
      // this.store.dispatch(cartActions.refreshCart({}))
      return
    }

    if (
      await firstValueFrom(
        this.modalService.showConfirmation(
          ConfirmationModalComponent,
          new Map().set("title", "Вы действительно хотите очистить корзину?")
        )
      )
    )
      this.store.dispatch(cartActions.removeCart({ cart: this.products() }))

    this.modalService.close()
  }
}

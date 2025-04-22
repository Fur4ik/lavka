import { ChangeDetectionStrategy, Component, computed, effect, input, output } from "@angular/core"
import { CommonModule } from "@angular/common"
import { CartPayload } from "@lavka/data-access"
import { PricePipe, SvgIconComponent } from "@lavka/common-ui"

@Component({
  selector: "lv-cart-footer",
  imports: [CommonModule, SvgIconComponent, PricePipe],
  templateUrl: "./cart-footer.component.html",
  styleUrl: "./cart-footer.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartFooterComponent {
  cart = input<CartPayload[]>()

  orderEmit = output<boolean>()

  totalPrice = computed(() => {
    const cart = this.cart()
    if (!cart) return 0

    return cart.reduce(function (acc, item) {
      return acc + item.count * item.product.price
    }, 0)
  })

  totalNumber = computed(() => {
    const cart = this.cart()
    if (!cart) return 0

    return cart.reduce(function (acc, item) {
      return acc + item.count
    }, 0)
  })

  onOrder(toggle: boolean) {
    this.orderEmit.emit(toggle)
  }
}

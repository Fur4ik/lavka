import { ChangeDetectionStrategy, Component, inject, input, signal } from "@angular/core"
import { CommonModule } from "@angular/common"
import { CartPayload, CartService, ModalService, Product } from "@lavka/data-access"
import {
  NotificationService,
  PricePipe,
  ProductModalComponent,
  ScoreCountPipe,
  SvgIconComponent
} from "@lavka/common-ui"

@Component({
  selector: "lv-product-card",
  imports: [CommonModule, PricePipe, SvgIconComponent, ScoreCountPipe],
  templateUrl: "./product-card.component.html",
  styleUrl: "./product-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  modalService = inject(ModalService)
  cartService = inject(CartService)
  notificationService = inject(NotificationService)

  product = input<Product>()

  isMouseEnter = signal(false)
  isMouseEnterBtn = signal(false)

  onCard() {
    const product = this.product()
    if (!product) return

    this.modalService.show(ProductModalComponent, new Map().set("product", product))
  }

  toCart(event: Event) {
    event.preventDefault()
    event.stopPropagation()

    const product = this.product()
    if (!product) return

    const payload: CartPayload = {
      product,
      count: 1,
    }

    this.notificationService.addNotification('Товар добавлен в корзину')
    this.cartService.addToCart(payload)
  }

  onLike(event: Event) {
    event.preventDefault()
    event.stopPropagation()
  }

  onMouseEnter() {
    this.isMouseEnter.set(true)
  }
  onMouseLeave() {
    this.isMouseEnter.set(false)
  }
  onMouseEnterBtn() {
    this.isMouseEnterBtn.set(true)
  }
  onMouseLeaveBtn() {
    this.isMouseEnterBtn.set(false)
  }
}

import { ChangeDetectionStrategy, Component, inject, input, OnInit, output, signal } from "@angular/core"
import { CommonModule } from "@angular/common"
import { cartActions, CartPayload, ModalService, Product } from "@lavka/data-access"
import { FormControl, ReactiveFormsModule } from "@angular/forms"
import { takeUntilDestroyed } from "@angular/core/rxjs-interop"
import { ScoreCountPipe } from "../../pipes"
import { BaseModalComponent, NotificationService } from ".."
import { SvgIconComponent } from "../svg-icon/svg-icon.component"
import { CountBtnComponent } from "../count-btn/count-btn.component"
import { Store } from "@ngrx/store"

@Component({
  selector: "lv-product-modal",
  imports: [CommonModule, BaseModalComponent, ScoreCountPipe, ReactiveFormsModule, SvgIconComponent, CountBtnComponent],
  templateUrl: "./product-modal.component.html",
  styleUrl: "./product-modal.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductModalComponent implements OnInit {
  modalService = inject(ModalService)
  store = inject(Store)
  notificationService = inject(NotificationService)

  productCount = new FormControl<number>(1)

  product = input<Product>()
  currentImage = signal<string>("")
  price = signal<number>(0)
  oldPrice = signal<number>(0)

  constructor() {
    this.productCount.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      const prodPrice = this.product()?.price
      const oldProdPrice = this.product()?.oldPrice
      if (!value || !prodPrice || !oldProdPrice) return

      this.price.set(prodPrice * value)
      this.oldPrice.set(oldProdPrice * value)
    })
  }

  ngOnInit() {
    const product = this.product()
    if (!product) return
    this.currentImage.set(product.images[0])
    this.price.set(product.price)
    this.oldPrice.set(product.oldPrice)
  }

  onImage(image: string) {
    this.currentImage.set(image)
  }

  onLike() {
    console.log("like")
  }

  onCross() {
    this.modalService.close()
  }

  toCart() {
    const product = this.product()
    const value = this.productCount.value
    if (!product || !value) return

    const payload: CartPayload = {
      product,
      count: value,
    }

    this.notificationService.addNotification('Товар добавлен в корзину')
    this.store.dispatch(cartActions.addProduct({payload}))
  }
}

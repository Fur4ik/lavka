import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  inject,
  input,
  OnInit,
  signal
} from "@angular/core"
import { CommonModule } from "@angular/common"
import { cartActions, CartPayload, ModalService } from "@lavka/data-access"
import { CountBtnComponent, ProductModalComponent, SvgIconComponent } from "@lavka/common-ui"
import { FormControl, ReactiveFormsModule } from "@angular/forms"
import { takeUntilDestroyed } from "@angular/core/rxjs-interop"
import { Store } from "@ngrx/store"

@Component({
  selector: "lv-cart-product-card",
  imports: [CommonModule, CountBtnComponent, ReactiveFormsModule, SvgIconComponent],
  templateUrl: "./cart-product-card.component.html",
  styleUrl: "./cart-product-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartProductCardComponent implements OnInit {
  modalService = inject(ModalService)
  destroyRef = inject(DestroyRef)
  store = inject(Store)

  product = input<CartPayload>()

  innerCount = new FormControl<number>(0)

  @HostListener("click", ["$event"])
  onClick(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    const product = this.product()?.product
    if (!product) return

    this.modalService.show(ProductModalComponent, new Map().set("product", product))
  }

  price = signal<number>(0)
  oldPrice = signal<number>(0)

  ngOnInit() {
    const product = this.product()
    if (!product) return
    this.innerCount.patchValue(product.count)
    this.price.set(product.product.price * product.count)
    this.oldPrice.set(product.product.oldPrice * product.count)

    this.innerCount.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((values) => {
      if (!values) return

      const payload: CartPayload = {
        product: product.product,
        count: values,
      }

      this.store.dispatch(cartActions.addProduct({ payload, typeAdd: "cart" }))
    })
  }

  onDelete(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    const product = this.product()
    if (!product) return

    this.store.dispatch(cartActions.removeProduct({ payload: product }))
  }
}

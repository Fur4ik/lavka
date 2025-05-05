import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core"
import { CommonModule } from "@angular/common"
import {
  CountBtnComponent,
  LvSelectorComponent,
  LvTextareaComponent, NotificationService,
  PricePipe,
  SvgIconComponent
} from "@lavka/common-ui"
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { takeUntilDestroyed } from "@angular/core/rxjs-interop"
import { CartPayload, CartService, orderFlowers } from "@lavka/data-access"

function getFlowersForm(flower?: string, price?: number) {
  return new FormGroup({
    flower: new FormControl<string>(flower ?? ""),
    count: new FormControl<number>(1),
    price: new FormControl<number>(price ?? 0),
  })
}

@Component({
  selector: "lv-order-flowers",
  imports: [
    CommonModule,
    LvTextareaComponent,
    ReactiveFormsModule,
    LvSelectorComponent,
    CountBtnComponent,
    SvgIconComponent,
    PricePipe,
  ],
  templateUrl: "./order-flowers.component.html",
  styleUrl: "./order-flowers.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFlowersComponent {
  flowers = orderFlowers
  cartService = inject(CartService)
  notificationService = inject(NotificationService)

  totalPrice = signal<number>(0)

  orderForm = new FormGroup({
    description: new FormControl<string>("", Validators.required),
    currentValue: new FormControl<string>(""),
    flowers: new FormArray([getFlowersForm()]),
  })

  defaultSelectorValue = "Выберите цветок"

  constructor() {
    this.orderForm.controls.flowers.clear()
    this.orderForm.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      const flowers = value!.flowers!
      this.totalPrice.set(
        flowers.reduce(function (acc, item) {
          return acc + item.price! * item.count!
        }, 0)
      )
    })
  }

  addFlower() {
    const selectedFlower = this.orderForm.controls.currentValue.value
    if (!selectedFlower || selectedFlower === this.defaultSelectorValue) return
    const currentFlower = this.flowers.find((flower) => flower.name === selectedFlower)!.price
    this.orderForm.controls.flowers.push(getFlowersForm(selectedFlower, currentFlower), { emitEvent: false })
    this.orderForm.controls.currentValue.patchValue("")
  }

  deleteFlower(index: number) {
    this.orderForm.controls.flowers.removeAt(index)
  }

  toCart() {
    const orderControls = this.orderForm.controls
    const description =
      this.orderForm.controls.description.value +
      ` ${orderControls.flowers.getRawValue().map((val) => ` ${val.flower} * ${val.count}шт.`)}`

    const id = Math.random()

    const payload: CartPayload = {
      product: {
        id,
        categoryId: 0,
        name: "Сборный букет",
        images: ["/assets/img/order-flowers.png"],
        price: this.totalPrice(),
        oldPrice: this.totalPrice(),
        score: 0,
        scoreCount: 0,
        description,
        availabilityTime: 0,
        assembled: false,
      },
      count: 1,
    }
    this.cartService.addToCart(payload)
    this.orderForm.controls.flowers.clear()
    this.orderForm.reset()

    this.notificationService.addNotification('Букет добавлен в корзину')
  }
}

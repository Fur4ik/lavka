import { ChangeDetectionStrategy, Component, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { BaseModalComponent, LvInputComponent } from "@lavka/common-ui"
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { takeUntilDestroyed } from "@angular/core/rxjs-interop"
import { cartActions, ModalService } from "@lavka/data-access"
import { Store } from "@ngrx/store"

@Component({
  selector: "lv-cart-order-modal",
  imports: [CommonModule, BaseModalComponent, LvInputComponent, ReactiveFormsModule],
  templateUrl: "./cart-order-modal.component.html",
  styleUrl: "./cart-order-modal.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartOrderModalComponent {
  modalService = inject(ModalService)
  store = inject(Store)

  orderForm = new FormGroup({
    firstName: new FormControl<string>("", [Validators.required, Validators.pattern(/^[А-Яа-яЁё]+$/)]),
    lastName: new FormControl<string>("", [Validators.required, Validators.pattern(/^[А-Яа-яЁё]+$/)]),
    email: new FormControl<string>("", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),]),
    address: new FormGroup({
      city: new FormControl<string>("", [Validators.required, Validators.pattern(/^[А-Яа-яЁё]+$/)]),
      street: new FormControl<string>("", [Validators.required, Validators.pattern(/^[А-Яа-яЁё0-9\s\-.,]+$/)]),
      building: new FormControl<number | null>(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      apartment: new FormControl<number | null>(null, [Validators.pattern(/^[0-9]+$/)]),
    }),
    timeDate: new FormGroup({
      time: new FormControl("", [Validators.required]),
      date: new FormControl("", [Validators.required]),
    })
  })

  constructor() {
    this.orderForm.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      console.log(value)
    })
  }

  onConfirm(toggle: boolean) {
    this.modalService.close()

    if (toggle) {
      this.store.dispatch(cartActions.removeCart({}))
    }
  }
}

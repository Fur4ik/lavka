import { ChangeDetectionStrategy, Component, inject, input, signal } from "@angular/core"
import { CommonModule } from "@angular/common"
import { BaseModalComponent, LvInputComponent, NotificationService } from "@lavka/common-ui"
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { cartActions, CartPayload, EmailDto, EmailService, ModalService } from "@lavka/data-access"
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
  emailService = inject(EmailService)
  notificationService = inject(NotificationService)

  products = input<CartPayload[]>()
  formInvalid = signal(false)

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

  onConfirm(toggle: boolean) {
    if (!toggle) this.modalService.close()

    if (toggle) {
      if (this.orderForm.invalid) {
        this.formInvalid.set(true)
        return
      }

      const products = this.products()
      const controls = this.orderForm.controls;
      const controlsAddress = this.orderForm.controls.address.controls;
      if(!products || !controls) return

      const payload: EmailDto = {
        email: controls.email.value!,
        product: products.map((product) => ({
          name: product.product.name,
          count: product.count,
          price: product.product.price,
          img: `https://lavka-six.vercel.app${product.product.images[0]}`,
          totalPriceProduct: product.count * product.product.price,
        })),
        totalPrice: products.reduce(function (acc, item) {
          return (acc += item.count * item.product.price)
        }, 0),
        logo: 'https://lavka-six.vercel.app/assets/img/logo.png',
        address: `г. ${controlsAddress.city.value}, ул. ${controlsAddress.street.value} ${controlsAddress.building.value}, кв.${controlsAddress.apartment.value}`,
        data: controls.timeDate.controls.date.value!,
        time: controls.timeDate.controls.time.value!,
      }

      this.emailService.sendEmail(payload)
        .then(()=>{
          console.log("Все окейно")
          this.notificationService.addNotification('На вашу почту отправлено сообщение с заказом')
        })

      this.modalService.close()
      this.store.dispatch(cartActions.removeCart({}))
    }
  }
}

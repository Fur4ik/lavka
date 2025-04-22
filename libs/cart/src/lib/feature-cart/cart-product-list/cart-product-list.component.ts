import { ChangeDetectionStrategy, Component, input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { CartPayload, Product } from "@lavka/data-access"
import { CartProductCardComponent } from "../cart-product-card/cart-product-card.component"

@Component({
  selector: "lv-cart-product-list",
  imports: [CommonModule, CartProductCardComponent],
  templateUrl: "./cart-product-list.component.html",
  styleUrl: "./cart-product-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartProductListComponent {
  products = input<CartPayload[]>()
}

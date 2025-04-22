import { ChangeDetectionStrategy, Component, input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Product } from "@lavka/data-access"
import { ProductCardComponent } from "../product-card/product-card.component"

@Component({
  selector: "lv-product-list",
  imports: [CommonModule, ProductCardComponent],
  templateUrl: "./product-list.component.html",
  styleUrl: "./product-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  products = input<Product[]>()
}

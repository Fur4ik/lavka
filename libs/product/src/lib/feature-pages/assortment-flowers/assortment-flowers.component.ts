import { Component, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ProductPageComponent } from "../../.."
import { ProductService } from "@lavka/data-access"
import { firstValueFrom } from "rxjs"

@Component({
  selector: "lv-assortment-flowers",
  imports: [CommonModule, ProductPageComponent],
  templateUrl: "./assortment-flowers.component.html",
  styleUrl: "./assortment-flowers.component.scss",
})
export class AssortmentFlowersComponent {
  productService = inject(ProductService)
  products$ = firstValueFrom(this.productService.getProductsFromCategoryId(4))
}

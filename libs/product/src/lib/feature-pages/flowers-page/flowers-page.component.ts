import { Component, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ProductPageComponent } from "../../.."
import { ProductService } from "@lavka/data-access"
import { firstValueFrom } from "rxjs"

@Component({
  selector: "lv-flowers-page",
  imports: [CommonModule, ProductPageComponent],
  templateUrl: "./flowers-page.component.html",
  styleUrl: "./flowers-page.component.scss",
})
export class FlowersPageComponent {
  productService = inject(ProductService)
  products$ = firstValueFrom(this.productService.getProductsFromCategoryId(1))
}

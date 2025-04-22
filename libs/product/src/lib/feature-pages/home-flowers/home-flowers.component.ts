import { ChangeDetectionStrategy, Component, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ProductPageComponent } from "../../.."
import { ProductService } from "@lavka/data-access"
import { firstValueFrom } from "rxjs"

@Component({
  selector: "lv-home-flowers",
  imports: [CommonModule, ProductPageComponent],
  templateUrl: "./home-flowers.component.html",
  styleUrl: "./home-flowers.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFlowersComponent {
  productService = inject(ProductService)
  products$ = firstValueFrom(this.productService.getProductsFromCategoryId(2))
}

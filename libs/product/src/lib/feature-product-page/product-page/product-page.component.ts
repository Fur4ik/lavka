import { ChangeDetectionStrategy, Component, input, OnInit, signal } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Product } from "@lavka/data-access"
import { ProductListComponent } from "../product-list/product-list.component"
import { FiltersProductComponent } from "../../feature-filters"
import { Filters, SELECTORS } from "../../data"

@Component({
  selector: "lv-product-page",
  imports: [CommonModule, ProductListComponent, FiltersProductComponent],
  templateUrl: "./product-page.component.html",
  styleUrl: "./product-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ProductPageComponent implements OnInit {
  products = input<Product[]>()
  pageType = input<string>('product')
  filteredProducts = signal<Product[]>([])

  selectors = SELECTORS

  ngOnInit(){
    const products = this.products()
    this.filteredProducts.set(products ?? [])
  }

  getFilters(filters: Filters) {
    const prod = this.products()

    let filteredProd: Product[] = []

    if (!prod) return

    filteredProd = prod.filter((product) => {
      return (
        product.price > filters.prise.low &&
        product.price < filters.prise.top &&
        ((filters.assembled && product.assembled) || !filters.assembled)
      )
    })

    if(this.selectors.POPULAR === filters.selectors){
      filteredProd.sort((a: Product, b: Product) => b.score - a.score)
    }
    if(this.selectors.LOWPRICE === filters.selectors){
      filteredProd.sort((a: Product, b: Product) => b.price - a.price)
    }
    if(this.selectors.TOPPRICE === filters.selectors){
      filteredProd.sort((a: Product, b: Product) => a.price - b.price)
    }

    this.filteredProducts.set(filteredProd)
  }
}

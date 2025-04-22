import { Component, inject } from "@angular/core"
import { CommonModule } from '@angular/common';
import { ProductService } from "@lavka/data-access"
import { concatMap, firstValueFrom, map, mergeAll, mergeMap, take, tap, toArray, zip } from "rxjs"
import { ProductPageComponent } from "@lavka/product"
import { CategoryListComponent } from "@lavka/common-ui"

@Component({
  selector: "lv-home-page",
  imports: [CommonModule, CategoryListComponent, ProductPageComponent],
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.scss",
})
export class HomePageComponent {
  productService = inject(ProductService)

  products$ = this.productService.getAllProducts().pipe(
    map((products) => {
      return products.sort((a,b)=> b.score - a.score).slice(0,15)
    })
  )
}
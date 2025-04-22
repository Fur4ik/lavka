import { Injectable } from "@angular/core"
import { category1 } from "../data-base/category1"
import { defer, from, Observable, of } from "rxjs"
import { Product } from "../interfaces/product.intervace"
import { category2 } from "../data-base/category2"
import { category4 } from "../data-base/category4"

@Injectable({
  providedIn: "root",
})
export class ProductService {
  products = new Map<number, Product[]>().set(1, category1).set(2, category2).set(4, category4)

  getProductsFromCategoryId(categoryId: number) {
    return of(this.products.get(categoryId))
  }

  getAllProducts(): Observable<Product[]> {
    return of([...this.products.values()].flat())
  }
}

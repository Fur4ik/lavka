import { Injectable } from "@angular/core"
import { Category } from "../interfaces/home.interfaces"
import { of } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class HomeServices {
  category: Category[] = [
    {
      name: "Букеты",
      img: "/assets/img/category1.png",
      src: "/flowers",
    },
    {
      name: "Цветы для дома",
      img: "/assets/img/category2.png",
      src: "/home-flowers",
    },
    {
      name: "Букеты на заказ",
      img: "/assets/img/category3.png",
      src: "/order-flowers",
    },
    {
      name: "Цветы ассортимент",
      img: "/assets/img/category4.png",
      src: "/assortment-flowers",
    },
    {
      name: "Монобукеты",
      img: "/assets/img/category5.png",
      src: "/flowers",
    },
  ]

  getCategories() {
    return of(this.category)
  }
}

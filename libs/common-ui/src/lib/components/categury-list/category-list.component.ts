import { Component, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { CategoryCardComponent } from ".."
import { HomeServices } from "@lavka/data-access"
import { firstValueFrom } from "rxjs"

@Component({
  selector: "lv-home-categories-list",
  imports: [CommonModule, CategoryCardComponent],
  templateUrl: "./category-list.component.html",
  styleUrl: "./category-list.component.scss",
})
export class CategoryListComponent {
  homeServices = inject(HomeServices)
  categories$ = firstValueFrom(this.homeServices.getCategories())
}

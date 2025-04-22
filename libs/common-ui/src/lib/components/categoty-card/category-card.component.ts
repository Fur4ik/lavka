import { ChangeDetectionStrategy, Component, input, signal } from "@angular/core"
import { CommonModule } from '@angular/common';
import { Category } from "@lavka/data-access"
import { RouterLink } from "@angular/router"

@Component({
  selector: "lv-category-card",
  imports: [CommonModule, RouterLink],
  templateUrl: "./category-card.component.html",
  styleUrl: "./category-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCardComponent {
  category = input<Category>()

  isMouseEnter = signal(false)

  onMouseEnter() {
    this.isMouseEnter.set(true)
  }

  onMouseLeave() {
    this.isMouseEnter.set(false)
  }
}

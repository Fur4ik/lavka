import { ChangeDetectionStrategy, Component, computed, output, signal } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FilterDropdownComponent } from "../filter-dropdown/filter-dropdown.component"
import { NgxSliderModule, Options } from "@angular-slider/ngx-slider"
import { Filters, SELECTORS } from "../../data"

@Component({
  selector: "lv-filters-product",
  imports: [CommonModule, FilterDropdownComponent, NgxSliderModule],
  templateUrl: "./filters-product.component.html",
  styleUrl: "./filters-product.component.scss",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersProductComponent {
  selectors = SELECTORS

  value = 0;
  highValue = 10000;
  options: Options = {
    floor: 0,
    ceil: 10000,
    step: 100,
  };

  emitFilterOutput = output<Filters>()

  isAssembled = signal(false)

  selector = signal<SELECTORS>(this.selectors.POPULAR)

  onOption(option: SELECTORS){
    this.selector.set(option)
  }


  emitFilter(){
    const filters: Filters = {
      prise: {
        top: this.highValue,
        low: this.value,
      },
      selectors: this.selector(),
      assembled: this.isAssembled(),
    }

    this.emitFilterOutput.emit(filters)
  }
}

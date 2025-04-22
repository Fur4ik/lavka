import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  input,
  output,
  signal,
  viewChild,
} from "@angular/core"
import { CommonModule } from "@angular/common"
import { SvgIconComponent } from "@lavka/common-ui"

@Component({
  selector: "lv-filter-dropdown",
  imports: [CommonModule, SvgIconComponent],
  templateUrl: "./filter-dropdown.component.html",
  styleUrl: "./filter-dropdown.component.scss",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterDropdownComponent {
  typeFilter = input<string>("select")
  isSelected = output<boolean>()
  emitFilter = output<boolean>()

  isOpen = signal(false)
  dropdown = viewChild("dropdown", { read: ElementRef })

  @HostListener("document:click", ["$event"])
  onClick(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    const target = event.target as HTMLElement
    const dropdown = this.dropdown()?.nativeElement as HTMLElement
    if (!dropdown) return
    if (!dropdown.contains(target)) {
      this.isOpen.set(false)
      return
    }

    this.emitFilter.emit(true)
  }

  onBtn() {
    this.isOpen.set(!this.isOpen())
    this.isSelected.emit(this.isOpen())
  }

  toApply(){
    this.isOpen.set(false)
    // this.emitFilter.emit(true)
  }
}

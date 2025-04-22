import { ChangeDetectionStrategy, Component, forwardRef, HostListener, input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms"
import { SvgIconComponent } from "../svg-icon/svg-icon.component"
import { takeUntilDestroyed } from "@angular/core/rxjs-interop"
import { PricePipe } from "../../pipes"

@Component({
  selector: "lv-count-btn",
  imports: [CommonModule, ReactiveFormsModule, SvgIconComponent, PricePipe],
  templateUrl: "./count-btn.component.html",
  styleUrl: "./count-btn.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountBtnComponent),
      multi: true,
    },
  ],
})
export class CountBtnComponent implements ControlValueAccessor {
  innerValue = new FormControl<number>(1)

  price = input.required<number>()
  oldPrice = input.required<number>()

  @HostListener('click', ["$event"])
  onClick(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
  }

  constructor() {
    this.innerValue.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      if (!value) return

      this.onChange(value)
      this.onTouched()
    })
  }

  onPlus() {
    const value = this.innerValue.value
    if (!value) return
    this.innerValue.patchValue(value + 1)
  }

  onMinus() {
    const value = this.innerValue.value
    if (!value || value < 2) {
      this.innerValue.patchValue(1)
      return
    }
    this.innerValue.patchValue(value - 1)
  }

  writeValue(value: number) {
    this.innerValue.patchValue(value)
  }

  onChange(value: number) {}
  onTouched() {}

  registerOnChange(fn: any) {
    this.onChange = fn
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn
  }
}

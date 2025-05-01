import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms"
import { LvTextareaComponent } from "../../.."

@Component({
  selector: "lv-selector",
  imports: [CommonModule],
  templateUrl: "./lv-selector.component.html",
  styleUrl: "./lv-selector.component.scss",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LvSelectorComponent),
      multi: true,
    },
  ],
})
export class LvSelectorComponent implements ControlValueAccessor {
  flowers = input<{name: string, price: number}[]>()

  isOpen = signal(false)

  value = signal<string>('')
  defaultValue = input<string>('')

  ngOnInit(){
    this.value.set(this.defaultValue())
  }

  setSelector(value: string){
    this.value.set(value)
    this.onChange(value)
  }

  writeValue(value: string) {
    this.value.set(this.defaultValue())

    if (value==='')
      this.value.set(this.defaultValue())
  }

  onChange(value: string) {}
  onTouched() {}

  registerOnChange(fn: any) {
    this.onChange = fn
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn
  }
}

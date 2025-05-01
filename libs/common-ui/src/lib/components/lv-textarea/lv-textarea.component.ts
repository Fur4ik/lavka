import { ChangeDetectionStrategy, Component, forwardRef } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms"
import { takeUntilDestroyed } from "@angular/core/rxjs-interop"

@Component({
  selector: "lv-textarea",
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./lv-textarea.component.html",
  styleUrl: "./lv-textarea.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LvTextareaComponent),
      multi: true,
    },
  ],
})
export class LvTextareaComponent implements ControlValueAccessor {
  innerInput = new FormControl<string>("")

  constructor() {
    this.innerInput.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      if (!value) return
      this.onChange(value)
    })
  }

  writeValue(value: string) {
    this.innerInput.patchValue(value)
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

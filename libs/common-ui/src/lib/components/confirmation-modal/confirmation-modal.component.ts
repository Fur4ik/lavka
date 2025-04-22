import { ChangeDetectionStrategy, Component, input, output } from "@angular/core"
import { CommonModule } from "@angular/common"
import { BaseModalComponent } from "../"

@Component({
  selector: "lv-confirmation-modal",
  imports: [CommonModule, BaseModalComponent],
  templateUrl: "./confirmation-modal.component.html",
  styleUrl: "./confirmation-modal.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationModalComponent {
  confirmation = output<boolean>()

  title = input<string>('')

  onConfirmation(toggle: boolean){
    this.confirmation.emit(toggle)
  }

}

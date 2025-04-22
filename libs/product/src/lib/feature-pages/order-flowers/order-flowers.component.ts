import { ChangeDetectionStrategy, Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "lv-order-flowers",
  imports: [CommonModule],
  templateUrl: "./order-flowers.component.html",
  styleUrl: "./order-flowers.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderFlowersComponent {}

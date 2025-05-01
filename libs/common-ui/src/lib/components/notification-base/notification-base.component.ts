import { ChangeDetectionStrategy, Component, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { NotificationService } from "./notification.service"

@Component({
  selector: "lv-notification-base",
  imports: [CommonModule],
  templateUrl: "./notification-base.component.html",
  styleUrl: "./notification-base.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NotificationBaseComponent {
  notificationService = inject(NotificationService)
  notifications = this.notificationService.notifications

  constructor() {
    setInterval(() => {
      const updatedNotifications = [...this.notifications()]
      updatedNotifications.shift()
      this.notifications.set(updatedNotifications)
    }, 2000)
  }
}

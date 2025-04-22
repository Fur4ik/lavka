import { ChangeDetectionStrategy, Component, OnInit, signal } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "lv-notification-base",
  imports: [CommonModule],
  templateUrl: "./notification-base.component.html",
  styleUrl: "./notification-base.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationBaseComponent implements OnInit {
  notifications = signal<string[]>([])

  ngOnInit() {
    setInterval(() => {
      const notifications = this.notifications()
      notifications.shift()
      this.notifications.set(notifications)
    }, 3000)
  }

  addNotification(notification: string) {
    const notifications = this.notifications()
    notifications.push(notification)
    this.notifications.set(notifications)
  }
}
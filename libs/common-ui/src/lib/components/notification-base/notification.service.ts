import { Injectable, signal } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications = signal<string[]>([])

  addNotification(notification: string) {
    const notifications = this.notifications()
    notifications.push(notification)
    this.notifications.set(notifications)

    console.log('NotificationService', this.notifications())
  }
}
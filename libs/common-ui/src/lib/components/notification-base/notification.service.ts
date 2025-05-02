import { Injectable, signal } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications = signal<string[]>([])

  addNotification(notification: string) {
    const notifications = this.notifications()
    this.notifications.set([...notifications, notification])
  }
}
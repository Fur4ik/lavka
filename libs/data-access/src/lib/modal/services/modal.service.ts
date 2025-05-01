import { Injectable, Type, ViewContainerRef } from "@angular/core"
import { outputToObservable } from "@angular/core/rxjs-interop"
import { defaultIfEmpty, of } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class ModalService {
  container?: ViewContainerRef
  notificationContainer?: ViewContainerRef

  register(container: ViewContainerRef) {
    this.container = container
  }

  destroy() {
    this.container?.clear()
  }

  show<T, N>(component: Type<T>, inputs?: Map<string, N>) {
    const container = this.container
    if (!container) return

    const newComponent = container.createComponent(component)

    inputs?.forEach((value, key) => {
      newComponent.setInput(key, value)
    })
  }

  showConfirmation<T, N>(component: Type<T>, inputs?: Map<string, N>) {
    const container = this.container
    if (!container) return of(false)

    const newComponent = container.createComponent(component)

    inputs?.forEach((value, key) => {
      newComponent.setInput(key, value)
    })

    const instance = newComponent.instance as any

    if (!instance.confirmation) return of(false)

    return outputToObservable(instance.confirmation).pipe(defaultIfEmpty(false))
  }

  close() {
    this.destroy()
  }

  registerNotification<T>(notificationContainer: ViewContainerRef, component: Type<T>) {
    this.notificationContainer = notificationContainer

    this.notificationContainer.createComponent(component)
  }
}

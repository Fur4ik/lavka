import { AfterViewInit, Component, inject, viewChild, ViewContainerRef } from "@angular/core"
import { RouterModule } from '@angular/router';
import { ModalService } from "@lavka/data-access"
import {LayoutComponent} from "@lavka/layout";
import { NotificationBaseComponent } from "@lavka/common-ui"

@Component({
  imports: [RouterModule, LayoutComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  modalService = inject(ModalService);
  
  title = 'lavka';

  modalHost = viewChild('modalHost', {read: ViewContainerRef});
  notificationHost = viewChild('notificationHost', {read: ViewContainerRef});

  ngAfterViewInit(){
    const modalHost = this.modalHost()
    const notificationHost = this.notificationHost()
    if(!modalHost || !notificationHost) return

    this.modalService.register(modalHost);
    this.modalService.registerNotification(notificationHost, NotificationBaseComponent);
  }
}

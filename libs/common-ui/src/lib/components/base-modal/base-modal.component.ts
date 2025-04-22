import { Component, ElementRef, HostListener, inject, TemplateRef, viewChild } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ModalService } from "@lavka/data-access"

@Component({
  selector: "lv-base-modal",
  imports: [CommonModule],
  templateUrl: "./base-modal.component.html",
  styleUrl: "./base-modal.component.scss",
})
export class BaseModalComponent {
  modalService = inject(ModalService);

  modalBackground = viewChild('modalBackground', {read: ElementRef});

  @HostListener("document:click", ['$event'])
  onClick(event: MouseEvent) {

    const modalBackground = this.modalBackground()

    if(!modalBackground) return

    const element = event.target as HTMLElement

    if(element === modalBackground.nativeElement) {
      this.modalService.close()
    }
  }
}

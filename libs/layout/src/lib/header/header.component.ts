import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router"
import { SvgIconComponent } from "@lavka/common-ui"

@Component({
  selector: "lv-header",
  imports: [CommonModule, RouterLink, SvgIconComponent],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}

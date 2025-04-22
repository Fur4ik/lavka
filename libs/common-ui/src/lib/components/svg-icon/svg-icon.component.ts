import { ChangeDetectionStrategy, Component, input } from "@angular/core"

@Component({
  selector: 'svg[icon]',
  template: '<svg:use [attr.href]="href"></svg:use>',
  styles: [],
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgIconComponent {
  icon = input<string>('')

  get href() {
    return `/assets/svg/${this.icon()}.svg#${this.icon()}`;
  }
}
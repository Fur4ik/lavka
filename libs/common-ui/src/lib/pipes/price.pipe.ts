import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: 'price',
  pure: false
})
export class PricePipe implements PipeTransform {
  transform(value: number) {
    return `${value.toLocaleString('ru-Ru')} ₽`
  }
}
import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: 'scoreCount',
  pure: false
})
export class ScoreCountPipe implements PipeTransform {
  transform(value: number) {
    if (value / 1000000 > 1)
      return `${value / 1000000} м.`
    if (value / 1000 > 1) 
      return `${value / 1000} тыс.`
    return value;
  }
}
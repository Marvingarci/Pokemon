import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokeid'
})
export class PokeidPipe implements PipeTransform {

  transform(id: number, ...args: unknown[]): string {
    let lenght = id.toString().length;
    // return "#"+(lenght < 3 ? )+id;
    return "#"+(('0000'+id).slice(-3));
  }

}

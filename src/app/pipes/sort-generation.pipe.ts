import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortGeneration'
})
export class SortGenerationPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any[] {
    return value.sort((n1: any,n2: any) => 
    {
      return n1.id - n2.id; 
    });
  }

}

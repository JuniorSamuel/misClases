import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe<T> implements PipeTransform {

  transform(value: any[], ...args: string[]): unknown {
    return null;
  }

}

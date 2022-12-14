import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any[], args: string[], searchfield: string): any[] {
    let r: any[] = [];

    value.forEach(v => {
      args.forEach(a => {
        if ( v[a]?.toLowerCase().indexOf(searchfield.toLowerCase()) > -1) {
          r.push(v);
        }
      })
    })
    return r;
  }
}

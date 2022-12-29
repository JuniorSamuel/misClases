import { EventEmitter, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FiltroPipe implements PipeTransform {

  transform(list: any[], args: string[] = [], searchfield: string = '', e: EventEmitter<number> | null = null): any[] {
    console.log(list);
    
    let r: any[] = [];

    if (args.length == 0 ) return list
  
    for (let index = 0; index < list.length; index++) {
      args.forEach( (value) => {
        if (
          list[index][value]?.toLowerCase().includes(searchfield.toLowerCase())&&
          !r.includes(list[index])
          ) {
            r.push(list[index]);
        }
      })
    }

    if (e) e.emit(r.length)
    console.log(r);
    
    return r;
  }
}

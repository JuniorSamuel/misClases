import { EventEmitter, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterWithPagination'
})
export class FilterWithPaginationPipe implements PipeTransform {

  transform(list: any[], search: string, filterIn: string[] = [], itemForPage: number = 2, indexPage: number = 1, EventEmit: EventEmitter<number> | null = null): any[] {
    let newList: any[] = []
    let start = (indexPage * itemForPage) - itemForPage;
    let end = start + itemForPage;

    if (filterIn.length == 0) return list

    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < filterIn.length; j++) {
        if (list[i][filterIn[j]].toLowerCase().includes(search.toLowerCase())) {
          newList.push(list[i]);
          break;
        }
      }
    }

    end = end <= newList.length ? end : newList.length;

    if (EventEmit) EventEmit.emit(newList.length)

    return newList.slice(start, end);
  }
}

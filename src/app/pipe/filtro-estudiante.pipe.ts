import { Pipe, PipeTransform } from '@angular/core';
import { Estudiante } from '../interface/estudiante.interface';

@Pipe({
  name: 'filtroEstudiante'
})
export class FiltroEstudiantePipe implements PipeTransform {

  transform(list: Estudiante[], searchfield: string): Estudiante[] {
    
    let newList:Estudiante[] = [];
    
    list.forEach( (value) => {
      if (
        value.nombre?.toLowerCase().indexOf(searchfield.toLowerCase()) > -1 ||
        value.apellido?.toLowerCase().indexOf(searchfield.toLowerCase()) > -1
      ) {
        newList.push(value);
      }
    })
    
    return newList;
  }

}

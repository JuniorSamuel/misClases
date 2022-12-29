import { Pipe, PipeTransform } from '@angular/core';
import { retry } from 'rxjs';
import { Util } from 'src/app/shared/class/Util/util';
import { Estudiante } from '../../interface/estudiante.interface';
import { Lista } from '../../interface/lista.interface';


export interface Attendance {
  id: number,
  nombre: string,
  apellido: string
  ausencias: number;
  excusas: number
}

export interface Histoy {
  id: number,
  nombre: string,
  apellido: string,
  semana: string[]
}

@Pipe({
  name: 'takeAttendancePipe'
})
export class takeAttendancePipe implements PipeTransform {

  transform(value: Estudiante[], ...args: unknown[]): Attendance[] {
    let attendance: Attendance[] = []

    value.forEach((e, i) => {
      let a: Attendance = {
        id: e.id,
        nombre: e.nombre,
        apellido: e.apellido,
        ausencias: this.getCount(e.lista, "A"),
        excusas: this.getCount(e.lista, "E")
      }

      attendance.push(a)
    })
    return attendance;
  }

  private getCount(list: Lista[], value: string): number {
    return list.filter(v => v.estado == value).length;
  }

}

@Pipe({
  name: 'histoyAttendance'
})
export class HistoyAttendancePipe implements PipeTransform {

  transform(value: Estudiante[], titleDia: Date[], week: number, date: Date): Histoy[] {

    let start: Date = date;

    let list: Histoy[] = []

    value.forEach((e, i) => {
      let h: Histoy = {
        id: i,
        nombre: e.nombre,
        apellido: e.apellido,
        semana: this.getValue(e.lista, start)
      }
      list.push(h);
    });

    return list;
  }

  cut(string: string, find: string) {
    let index = string.indexOf("T");
    return string.substring(0, index)

  }

  getValue(list: Lista[], date: Date): string[] {
    let status: string[] = ["-", "-", "-", "-", "-"]
    let indexStart = list.findIndex(value => this.chackDate(value.fecha, date)) 

    if (list.length == 0 || indexStart < 0) return status;

    status.forEach( (value, index) => {
      for (let i = indexStart; i < list.length; i++) {
        const element = list[i];

        if(element.estado !="-" && this.isEgualDate(element.fecha, date)){
          status[index] = element.estado;
        }
      }

      date = Util.addDaysToDate(date,1);
    })

    return status;
  }

  chackDate(string:string, date:Date): boolean{
    let d = new Date(string);
    return  d.getFullYear() >= date.getFullYear() &&
    d.getMonth() >= date.getMonth() &&
    d.getDate >= date.getDate 
  }

  isEgualDate(string:string, date:Date): boolean{

    let st = this.cut(string, "T");
    let day = this.cut(date.toJSON(), "T");
    
    return st == day;
  }



}

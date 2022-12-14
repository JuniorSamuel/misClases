import { Pipe, PipeTransform } from '@angular/core';
import { retry } from 'rxjs';
import { Estudiante } from '../interface/estudiante.interface';
import { Lista } from '../interface/lista.interface';
import { Util } from '../util/util';

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
    let weekDate = date;
    let start: Date = Util.addDaysToDate(weekDate, (weekDate.getDay() * -1));

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
    console.log(list);


    return list;
  }

  cut(string: string, find: string) {
    let index = string.indexOf("T");
    return string.substring(0, index)

  }
  getValue(list: Lista[], start: Date): string[] {
    let r: string[] = ["-", "-", "-", "-", "-"]
    let indexDate: Date = new Date(start);
    let dayIndex: number = indexDate.getDate();


    let v2 = this.cut(Util.addDaysToDate(indexDate, 0).toJSON(), "T");
    let has = list.filter( e => this.cut(e.fecha, "T") == v2).length
    if (has > 0 ) {
      for (let i = 0; i < list.length; i++) {
        
  
        let v1 = this.cut(list[i].fecha, "T");

        if (v1 == v2 ) {
          r[0] = list[i].estado;
          dayIndex++
        }
    
      }
     
    }
    indexDate = Util.addDaysToDate(indexDate, 1);
    v2 = this.cut(Util.addDaysToDate(indexDate, 0).toJSON(), "T");
    has = list.filter( e => this.cut(e.fecha, "T") == v2).length
    if (has > 0 ) {
      for (let i = 0; i < list.length; i++) {
        
  
        let v1 = this.cut(list[i].fecha, "T");

        if (v1 == v2 ) {
          r[1] = list[i].estado;
          dayIndex++
        }
    
      }
      
    }
    indexDate = Util.addDaysToDate(indexDate, 1);
    v2 = this.cut(Util.addDaysToDate(indexDate, 0).toJSON(), "T");
    has = list.filter( e => this.cut(e.fecha, "T") == v2).length
    if (has > 0 ) {
      for (let i = 0; i < list.length; i++) {
        
  
        let v1 = this.cut(list[i].fecha, "T");

        if (v1 == v2 ) {
          r[2] = list[i].estado;
          dayIndex++
        }
    
      }
     
    }
    indexDate = Util.addDaysToDate(indexDate, 1);
    v2 = this.cut(Util.addDaysToDate(indexDate, 0).toJSON(), "T");
    has = list.filter( e => this.cut(e.fecha, "T") == v2).length
    if (has > 0 ) {
      for (let i = 0; i < list.length; i++) {
        
  
        let v1 = this.cut(list[i].fecha, "T");

        if (v1 == v2 ) {
          r[3] = list[i].estado;
          dayIndex++
        }
    
      }
      
    }
    indexDate = Util.addDaysToDate(indexDate, 1);
    v2 = this.cut(Util.addDaysToDate(indexDate, 0).toJSON(), "T");
    has = list.filter( e => this.cut(e.fecha, "T") == v2).length
    if (has > 0 ) {
      for (let i = 0; i < list.length; i++) {
        
  
        let v1 = this.cut(list[i].fecha, "T");

        if (v1 == v2 ) {
          r[4] = list[i].estado;
          dayIndex++
        }
    
      }
      
    }

    indexDate = Util.addDaysToDate(indexDate, 1);


    return r;
  }

}

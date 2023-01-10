import { Pipe, PipeTransform } from '@angular/core';
import { retry } from 'rxjs';
import { Util } from 'src/app/shared/class/Util/util';
import { Student } from '../../interface/student.interface';
import { Attendance } from '../../interface/attendance.interface';


export interface AttendanceTable {
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

  transform(value: Student[], ...args: unknown[]): AttendanceTable[] {
    let attendance: AttendanceTable[] = []
    
    value.forEach((student, i) => {
      let a: AttendanceTable = {
        id: student.id,
        nombre: student.name,
        apellido: student.lastName,
        ausencias: this.getCount(student.attendances, "A"),
        excusas: this.getCount(student.attendances, "E")
      }

      attendance.push(a)
    })
    return attendance;
  }

  private getCount(list: Attendance[], value: string): number {
    return list.filter(v => v.status == value).length;
  }

}

@Pipe({
  name: 'histoyAttendance'
})
export class HistoyAttendancePipe implements PipeTransform {

  transform(value: Student[], titleDia: Date[], week: number, date: Date): Histoy[] {

    let start: Date = date;

    let list: Histoy[] = []

    value.forEach((student, i) => {
      let h: Histoy = {
        id: i,
        nombre: student.name,
        apellido: student.lastName,
        semana: this.getValue(student.attendances, start)
      }
      list.push(h);
    });

    return list;
  }

  cut(string: string, find: string) {
    let index = string.indexOf("T");
    return string.substring(0, index)

  }

  getValue(list: Attendance[], date: Date): string[] {
    let status: string[] = ["-", "-", "-", "-", "-"]
    
    let indexStart = list.findIndex(value => this.chackDate(value.date, date)) 

    if (list.length == 0 || indexStart < 0) return status;

    status.forEach( (value, index) => {
      for (let i = indexStart; i < list.length; i++) {
        const element = list[i];

        if(element.status !="-" && this.isEgualDate(element.date, date)){
          status[index] = element.status;
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

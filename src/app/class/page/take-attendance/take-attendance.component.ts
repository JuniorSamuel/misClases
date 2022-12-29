import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BsToastService, ToastStyle } from 'src/app/core/service/bs-toast.service';
import { Util } from 'src/app/shared/class/Util/util';
import { Estudiante } from '../../interface/estudiante.interface';
import { Lista } from '../../interface/lista.interface';
import { ClassApiService } from '../../service/class-api.service';

@Component({
  selector: 'app-take-attendance',
  templateUrl: './take-attendance.component.html',
  styleUrls: ['./take-attendance.component.scss']
})
export class TakeAttendanceComponent implements OnInit {

  public Estudiantes: Estudiante[] = [];
  public Attendance: any = {};
  public today: NgbDate;
  public selectedDate: NgbDate;
  public week: number = Util.getCurrentWeek();
  public firstDayOfWeek: number;
  public weekLabel: Date[] = [];
  public dateWeek: Date;

  constructor(private claseApi: ClassApiService, private calendar: NgbCalendar, private toast: BsToastService) {
    this.today = this.calendar.getToday();
    this.selectedDate = this.today;
    this.firstDayOfWeek = this.today.day - (this.calendar.getWeekday(this.today) - 1);
    this.dateWeek = new Date(this.today.year, this.today.month-1, this.firstDayOfWeek)
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.claseApi.Estudiante.getAll('/list').subscribe(res => {
      this.Estudiantes = res;
      this.updateWeekLabel();
    })
  }
  selectStatu(id: number, value: string) {
    this.Attendance[id] = value;
  }

  allPresent() {

    this.Attendance = {};
    this.Estudiantes.forEach(e => {
      this.Attendance[e.id] = "P";
    })
  }

  clear() {
    this.Attendance = {};
  }

  /**
   * sendAttendace
   */
  public sendAttendace() {

    let isValid = true;
    let list: Lista[] = [];
    let idStudentList: string[] = Object.keys(this.Attendance);
    
    if (idStudentList.length == 0) {
      this.toast.show('Debe registrar al menos un estudiante', 
      {style: ToastStyle.Warning, delay: 7500})
      isValid =false;
    } 

    if (!this.calendar.isValid(this.selectedDate)) {
      this.toast.show('Fecha invalida', {style: ToastStyle.Danger})
      isValid =false
    }
    
    if (idStudentList.length == this.Estudiantes.length && isValid) {
      let dateISO = new Date(this.selectedDate.year, this.selectedDate.month-1, this.selectedDate.day)
      idStudentList.forEach(id => {
        let idNum: number = +id;
        list.push(
          {
            id: 0,
            idEstudiante:
              idNum,
            fecha: dateISO.toISOString(),
            estado: this.Attendance[id]
          })
      });
      console.log(list);

      this.claseApi.Lista.add(list).subscribe(
        res => {
          this.getStudents()
          this.toast.show('Lista guardada',{style: ToastStyle.Success})
        }
      )
    }
  }

  // History Code

  public weekChange(num: number) {
    
    
    if (num >0) {
      this.dateWeek = Util.addDaysToDate(this.dateWeek, 7);
    }else{
      this.dateWeek = Util.addDaysToDate(this.dateWeek,-7);
    }
    this.week = Util.getWeek(this.dateWeek)
    this.updateWeekLabel()
  }

  public updateWeekLabel() {

    let temp = this.dateWeek;
    for (let index = 0; index < 5; index++) {
      this.weekLabel[index] = temp;
      temp = Util.addDaysToDate(temp, 1)
    }
  }
}

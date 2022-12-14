import { Component, OnInit } from '@angular/core';
import { ClaseApiService } from 'src/app/core/service/clase-api.service';
import { Util } from 'src/app/util/util';
import { Estudiante } from 'src/app/interface/estudiante.interface';
import { Lista } from 'src/app/interface/lista.interface';

@Component({
  selector: 'app-take-attendance',
  templateUrl: './take-attendance.component.html',
  styleUrls: ['./take-attendance.component.scss']
})
export class TakeAttendanceComponent implements OnInit {

  public Estudiantes: Estudiante[] = [];
  public Attendance: any = {};
  public date: string = '2022-12-13';
  public weekDate = new Date(this.date);
  public week: number = Util.getCurrentWeek();
  public weekLabel: Date[] = []
  constructor(private claseApi: ClaseApiService) { }

  ngOnInit(): void {

   this.getEstudiante()

  }

  getEstudiante(){
    this.claseApi.Estudiante.getAll('/list').subscribe( res => {
      this.Estudiantes = res;
      this.updateWeekLabel();
    })
  }
  selectStatu(id:number, value: string){
    this.Attendance[id] = value;
  }

  allPresent() {
    
    this.Attendance = {};
    this.Estudiantes.forEach( e => {
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
    
    let dateISO = new Date(this.date)
    
    let list: Lista[] = [];
    let idStudent: string[] = Object.keys(this.Attendance);

    if (idStudent.length == this.Estudiantes.length) {
      idStudent.forEach(id => {
        let idNum: number = +id;
        list.push(
          {id: 0, 
          idEstudiante: 
          idNum, 
          fecha: dateISO.toISOString(), 
          estado: this.Attendance[id]})
      });
      console.log(list);
      
      this.claseApi.Lista.add(list).subscribe(
        res => {
          console.log(res);   
        }
      )
    }

    this.getEstudiante()
  }

  // History Code

  public weekChange(num: number){
    this.week +=  num;
    
    if (num >0) {
      this.weekDate = Util.addDaysToDate(this.weekDate, 7);
    }else{
      this.weekDate = Util.addDaysToDate(this.weekDate,-7);
    }
    this.updateWeekLabel()
  }

  public updateWeekLabel() {
    let startday: Date = Util.addDaysToDate( this.weekDate, (this.weekDate.getDay() * -1))
    for (let index = 0; index < 5; index++) {
      this.weekLabel[index] = startday;
      startday = Util.addDaysToDate(startday, 1);
    }
  }
}

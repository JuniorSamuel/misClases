import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { BsToastService, ToastStyle } from 'src/app/core/service/bs-toast.service';
import { Attendance } from '../../interface/attendance.interface';
import { Student } from '../../interface/student.interface';
import { ClassApiService } from '../../service/class-api.service';

@Component({
  selector: 'app-take-attendance',
  templateUrl: './take-attendance.component.html',
  styleUrls: ['./take-attendance.component.scss']
})
export class TakeAttendanceComponent implements OnInit, OnChanges {
  
  @Input('list') Students: Student[] = null!;
  @Input() today: NgbDate = null!;
  @Output('onSaveAttendance') evenSave: EventEmitter<Attendance[]> =new EventEmitter();

  public selectedDate: NgbDate = null!;
  public Attendance: any = {};

  constructor(private claseApi: ClassApiService,private calendar: NgbCalendar, private toast: BsToastService) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.selectedDate = this.today;
  }

  ngOnInit(): void {
    this.dateSelect()
  }

  dateSelect(){
    let {year, month, day} = this.selectedDate;
    this.claseApi.Attendance.getAll(`/${year}-${month}-${day}`).subscribe( res => {
      res.forEach(element => {
        this.Attendance[element.studentId] = element.status
      });      
    })
  }

  allPresent() {

    this.Attendance = {};
    this.Students.forEach(e => {
      this.Attendance[e.id] = "P";
    })
  }

  selectStatu(id: number, value: string) {
    this.Attendance[id] = value;
  }

  clear() {
    this.Attendance = {};
  }

   public sendAttendace() {
    let isValid = true;
    let attendance: Attendance[] = [];
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
    
    if (idStudentList.length == this.Students.length && isValid) {
      let dateISO = new Date(this.selectedDate.year, this.selectedDate.month-1, this.selectedDate.day)
      idStudentList.forEach(id => {
        let idNum: number = +id;
        attendance.push(
          {
            id: 0,
            studentId: idNum,
            date: dateISO.toISOString(),
            status: this.Attendance[id]
          })
      });

      this.claseApi.Attendance.add(attendance).subscribe(
        res => {
          this.evenSave.next(res)
          this.toast.show('Asistencia guardada',{style: ToastStyle.Success})
        }
      )
    }
  }
 
}

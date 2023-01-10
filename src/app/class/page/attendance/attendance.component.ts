import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BsToastService, ToastStyle } from 'src/app/core/service/bs-toast.service';
import { Util } from 'src/app/shared/class/Util/util';
import { Student } from '../../interface/student.interface';
import { Attendance } from '../../interface/attendance.interface';
import { ClassApiService } from '../../service/class-api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  public Students: Student[] = [];
  public today: NgbDate;
  public firstDayOfWeek: number;
  public dateWeek: Date = null!;
  private state = new BehaviorSubject(this.Students);
  public eventStream$ = this.state.asObservable()

  constructor(private claseApi: ClassApiService, private calendar: NgbCalendar, private toast: BsToastService) {
    this.today = this.calendar.getToday();
    this.firstDayOfWeek = this.today.day - (this.calendar.getWeekday(this.today) - 1);
    this.dateWeek = new Date(this.today.year, this.today.month - 1, this.firstDayOfWeek)

  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.claseApi.Student.getAll('/attendance').subscribe(res => {
      this.Students = res;
      this.state.next(this.Students)
    })
  }

  getSaveAttendance(attendance: Attendance[]){
   this.getStudents()
  }
}

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Util } from 'src/app/shared/class/Util/util';
import { Student } from '../../interface/student.interface';

@Component({
  selector: 'app-attendance-history',
  templateUrl: './attendance-history.component.html',
  styleUrls: ['./attendance-history.component.scss']
})
export class AttendanceHistoryComponent implements OnInit, OnChanges{

  @Input('list') Students: Student[] = null!;
  @Input() firstDayOfWeek: number = null!;
  @Input('week') dateWeek: Date = null!;
  @Input() evenStudent: Observable<Student[]> = null!;

  public weekLabel: Date[] = [];
  public week: number = Util.getCurrentWeek();

  constructor() {}

  ngOnInit(): void {
    this.evenStudent.subscribe( res => {
      this.updateWeekLabel();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  public weekChange(num: number) {
    if (num > 0) {
      this.dateWeek = Util.addDaysToDate(this.dateWeek, 7);
    } else {
      this.dateWeek = Util.addDaysToDate(this.dateWeek, -7);
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

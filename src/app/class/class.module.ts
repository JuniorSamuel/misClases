import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassRoutingModule } from './class-routing.module';
import { HomeComponent } from './page/home/home.component';
import { ClassApiService } from './service/class-api.service';
import { SharedModule } from '../shared/shared.module';
import { SubjectComponent } from './page/subject/subject.component';
import { ScorePipe } from './pipe/score/score.pipe';
import { StudentComponent } from './page/student/student.component';
import { AttendanceComponent } from './page/attendance/attendance.component';
import { HistoyAttendancePipe, takeAttendancePipe } from './pipe/take-attendance/histoy-attendance.pipe';
import { AttendanceHistoryComponent } from './component/attendance-history/attendance-history.component';
import { TakeAttendanceComponent } from './component/take-attendance/take-attendance.component';


@NgModule({
  declarations: [
    HomeComponent,
    SubjectComponent,
    ScorePipe,
    StudentComponent,
    AttendanceComponent,
    takeAttendancePipe,
    HistoyAttendancePipe,
    AttendanceHistoryComponent,
    TakeAttendanceComponent
  ],
  imports: [
    CommonModule,
    ClassRoutingModule,
    SharedModule
  ],
  providers: [ClassApiService]
})
export class ClassModule { }

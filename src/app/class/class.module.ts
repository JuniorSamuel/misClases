import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassRoutingModule } from './class-routing.module';
import { HomeComponent } from './page/home/home.component';
import { ClassApiService } from './service/class-api.service';
import { SharedModule } from '../shared/shared.module';
import { SubjectComponent } from './page/subject/subject.component';
import { ScorePipe } from './pipe/score/score.pipe';
import { StudentComponent } from './page/student/student.component';
import { TakeAttendanceComponent } from './page/take-attendance/take-attendance.component';
import { HistoyAttendancePipe, takeAttendancePipe } from './pipe/take-attendance/histoy-attendance.pipe';


@NgModule({
  declarations: [
    HomeComponent,
    SubjectComponent,
    ScorePipe,
    StudentComponent,
    TakeAttendanceComponent,
    takeAttendancePipe,
    HistoyAttendancePipe
  ],
  imports: [
    CommonModule,
    ClassRoutingModule,
    SharedModule
  ],
  providers: [ClassApiService]
})
export class ClassModule { }

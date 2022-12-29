import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { StudentComponent } from './page/student/student.component';
import { SubjectComponent } from './page/subject/subject.component';
import { TakeAttendanceComponent } from './page/take-attendance/take-attendance.component';
import { takeAttendancePipe } from './pipe/take-attendance/histoy-attendance.pipe';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'sub/:id/:name',
        component: SubjectComponent
      },
      {
        path: 'student',
        component: StudentComponent
      },
      {
        path: 'take_attendence',
        component: TakeAttendanceComponent
      }
    ]
  },{path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }

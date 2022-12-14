import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { StudentComponent } from './page/student/student.component';
import { SubjectComponent } from './page/subject/subject.component';
import { TakeAttendanceComponent } from './page/take-attendance/take-attendance.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'student',
    component: StudentComponent
  },
  {
    path: 'takeAttendance',
    component: TakeAttendanceComponent
  },
  {
    path: 'sub/:id/:name',
    component: SubjectComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

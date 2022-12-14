import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { CoreModule } from './core/core.module';
import { StudentComponent } from './page/student/student.component';
import { FiltroEstudiantePipe } from './pipe/filtro-estudiante.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TakeAttendanceComponent } from './page/take-attendance/take-attendance.component';
import { HistoyAttendancePipe, takeAttendancePipe } from './pipe/histoy-attendance.pipe';
import { SubjectComponent } from './page/subject/subject.component';
import { ScorePipe } from './pipe/score.pipe';
import { FiltroPipe } from './pipe/filtro.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentComponent,
    FiltroEstudiantePipe,
    TakeAttendanceComponent,
    HistoyAttendancePipe,
    takeAttendancePipe,
    SubjectComponent,
    ScorePipe,
    FiltroPipe
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    NgbModule,
  ]
})
export class AppModule { }

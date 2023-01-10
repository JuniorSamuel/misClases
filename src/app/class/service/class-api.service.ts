import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Crud } from 'src/app/shared/class/crud';
import { environment } from 'src/environments/environment';
import { Score } from '../interface/score.interface';
import { Student } from '../interface/student.interface';
import { Attendance } from '../interface/attendance.interface';
import { Subject } from '../interface/subject.interface';

@Injectable({
  providedIn: 'root'
})
export class ClassApiService {
  public Student: Crud<Student>;
  public Subject: Crud<Subject>;
  public Attendance: Crud<Attendance>;
  public Calificacion: Crud<Score>

  constructor(private http: HttpClient) {
    this.Student = new Crud<Student>(http, `${environment.urlAPI}/Student`);
    this.Subject = new Crud<Subject>(http, `${environment.urlAPI}/Subject`);
    this.Attendance = new Crud<Attendance>(http, `${environment.urlAPI}/Attendance`);
    this.Calificacion = new Crud<Score>(http, `${environment.urlAPI}/Score`);
   }
}

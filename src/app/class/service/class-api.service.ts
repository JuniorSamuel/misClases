import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Crud } from 'src/app/shared/class/crud';
import { environment } from 'src/environments/environment';
import { Asignacion } from '../interface/asignacion.interface';
import { Calificacion } from '../interface/calificacion.interface';
import { Estudiante } from '../interface/estudiante.interface';
import { Lista } from '../interface/lista.interface';
import { Materia } from '../interface/materia.interface';

@Injectable({
  providedIn: 'root'
})
export class ClassApiService {
  public Estudiante: Crud<Estudiante>;
  public Materia: Crud<Materia>;
  public Lista: Crud<Lista>;
  public Asignacion: Crud<Asignacion>;
  public Calificacion: Crud<Calificacion>

  constructor(private http: HttpClient) {
    this.Estudiante = new Crud<Estudiante>(http, `${environment.urlAPI}/Estudiantes`);
    this.Materia = new Crud<Materia>(http, `${environment.urlAPI}/Materias`);
    this.Lista = new Crud<Lista>(http, `${environment.urlAPI}/Listas`);
    this.Asignacion = new Crud<Asignacion>(http, `${environment.urlAPI}/Asignaciones`);
    this.Calificacion = new Crud<Calificacion>(http, `${environment.urlAPI}/Calificaciones`);
   }
}

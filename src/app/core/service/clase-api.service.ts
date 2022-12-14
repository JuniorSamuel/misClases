import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asignacion } from 'src/app/interface/asignacion.interface';
import { Calificacion } from 'src/app/interface/calificacion.interface';
import { Estudiante } from 'src/app/interface/estudiante.interface';
import { Lista } from 'src/app/interface/lista.interface';
import { Materia } from 'src/app/interface/materia.interface';
import { environment } from 'src/environments/environment';
import { Crud } from '../class/crud';

@Injectable({
  providedIn: HttpClient
})
export class ClaseApiService {

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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ClaseApiService } from 'src/app/core/service/clase-api.service';
import { Calificacion } from 'src/app/interface/calificacion.interface';
import { Estudiante } from 'src/app/interface/estudiante.interface';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  public title = '';
  public idSubject = 0;
  public Estudiantes: Estudiante[] = []
  public Score: any = {}
  Calificaciones: Calificacion[] = [];
  public formControls: FormGroup;
  constructor(private claseApi: ClaseApiService, private rutaActiva: ActivatedRoute, private formBuilder: FormBuilder) {
    this.formControls = this.formBuilder.group({})
  }

  ngOnInit(): void {
    this.title = this.rutaActiva.snapshot.params['name'];
    this.idSubject = this.rutaActiva.snapshot.params['id'];
    this.getStudents()

  }

  getStudents() {
    this.claseApi.Estudiante.getAll("/score").subscribe(res => {
      this.Estudiantes = res;
      let control: any = {}
      this.Estudiantes.forEach((e) => {
        control[e.id] = ''
      })
      this.formControls = this.formBuilder.group(control);
      console.log(this.formControls);
      
    })
  }
  public newScore(e: Event, idStundent: number, idScore: number) {
    let et: HTMLInputElement = e.target as HTMLInputElement
    console.log(et.value);

    let score: Calificacion = {
      id: idScore,
      idEstudiante: idStundent,
      idMateria: +this.idSubject,
      valor: +et.value,

    }

    this.claseApi.Calificacion.update(idScore, score).subscribe(res => {
      this.getStudents();
    });
  }

  public save(){

  }
}

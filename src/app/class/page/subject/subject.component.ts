import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsToastService, ToastStyle } from 'src/app/core/service/bs-toast.service';
import { Calificacion } from '../../interface/calificacion.interface';
import { Estudiante } from '../../interface/estudiante.interface';
import { Materia } from '../../interface/materia.interface';
import { ClassApiService } from '../../service/class-api.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  public materia: Materia = { id: 0, nombre: 'title' };
  public estudiantes: Estudiante[] = []
  private score: any = {};
  constructor(
    private activedRouter: ActivatedRoute, 
    private classApi: ClassApiService,
    private toastService: BsToastService
    ) { }

  ngOnInit(): void {
    this.materia.id = this.activedRouter.snapshot.params['id'];
    this.materia.nombre = this.activedRouter.snapshot.params['name']
    this.getData();
  }

  private getData() {
    this.classApi.Estudiante.getAll('/score').subscribe(res => {
      this.estudiantes = res;
    })
  }

  public newScore(e: Event, id: number, idScore: number) {

    let et = e.target as HTMLInputElement;

    let score: Calificacion = {
      id: idScore,
      idEstudiante: id,
      idMateria: this.materia.id,
      valor: +et.value
    }
   
    this.score[id] = score;
    console.log(this.score);
  }

  public updateScore() {
    let scoreList: Calificacion[] = Object.values(this.score);
    this.classApi.Calificacion.add(scoreList).subscribe( res => {
      console.log(res);
      this.toastService.show(`${scoreList.length} calificacion actualizada`, { style: ToastStyle.Success})
      this.estudiantes = res as Estudiante[];
      
    });
    this.score = {}
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsToastService, ToastStyle } from 'src/app/core/service/bs-toast.service';
import { Score } from '../../interface/score.interface';
import { Student } from '../../interface/student.interface';
import { Subject } from '../../interface/subject.interface';
import { ClassApiService } from '../../service/class-api.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  public subject: Subject = { id: 0, name: 'title' };
  public estudiantes: Student[] = []
  private score: any = {};
  constructor(
    private activedRouter: ActivatedRoute, 
    private classApi: ClassApiService,
    private toastService: BsToastService
    ) { }

  ngOnInit(): void {
    this.subject.id = this.activedRouter.snapshot.params['id'];
    this.subject.name = this.activedRouter.snapshot.params['name']
    this.getData();
  }

  private getData() {
    this.classApi.Student.getAll('/score').subscribe(res => {
      this.estudiantes = res;
    })
  }

  public newScore(e: Event, id: number, idScore: number) {

    let et = e.target as HTMLInputElement;

    let score: Score = {
      id: idScore,
      studentId: id,
      subjectId: this.subject.id,
      value: +et.value
    }
   
    this.score[id] = score;
    console.log(this.score);
  }

  public updateScore() {
    let scoreList: Score[] = Object.values(this.score);
    this.classApi.Calificacion.add(scoreList).subscribe( res => {
      console.log(res);
      this.toastService.show(`${scoreList.length} calificacion actualizada`, { style: ToastStyle.Success})
      this.estudiantes = res as Student[];
      
    });
    this.score = {}
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Score } from '../../interface/score.interface';
import { Student } from '../../interface/student.interface';

export interface tableScore {
  id: number,
  idCalificacion: number,
  nombre: string,
  apellido: string,
  calificacion: number,
  literal: string
}

@Pipe({
  name: 'score'
})
export class ScorePipe implements PipeTransform {

  transform(value: Student[], idSubject: number): tableScore[] {
    let ts: tableScore[] = []

    value.forEach( (student,i) => {
      let t: tableScore = {
        id: student.id,
        idCalificacion: this.getId(student.scores, student.id, idSubject),
        nombre: student.name,
        apellido: student.lastName,
        calificacion: this.getScore(student.scores, student.id, idSubject),
        literal: ""
      }

      t.literal = this.gatLitera(t.calificacion);
      ts.push(t)
    })

    return ts;
  }

  public getScore(c: Score[], idStudent: number, idSubject: number): number {
    let v = c.find(student => student.studentId == idStudent && student.subjectId == idSubject)?.value
    return v ? v : 0;
  }

  public getId(c: Score[], idStudent: number, idSubject: number): number {
    let v = c.find(student => student.studentId == idStudent && student.subjectId == idSubject)?.id
    return v ? v : 0;
  }

  gatLitera(value: number){
    if (value >= 90) {
      return "A"
    }else if (value >=80) {
      return "B"
    }else if (value >= 70) {
      return "C"
    }else{
      return "F"
    }
  }

}

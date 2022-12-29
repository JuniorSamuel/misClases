import { Pipe, PipeTransform } from '@angular/core';
import { Calificacion } from '../../interface/calificacion.interface';
import { Estudiante } from '../../interface/estudiante.interface';

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

  transform(value: Estudiante[], idSubject: number): tableScore[] {
    let ts: tableScore[] = []

    value.forEach( (e,i) => {
      let t: tableScore = {
        id: e.id,
        idCalificacion: this.getId(e.calificacions, e.id, idSubject),
        nombre: e.nombre,
        apellido: e.apellido,
        calificacion: this.getScore(e.calificacions, e.id, idSubject),
        literal: ""
      }

      t.literal = this.gatLitera(t.calificacion);
      ts.push(t)
    })

    return ts;
  }

  public getScore(c: Calificacion[], idStudent: number, idSubject: number): number {
    let v = c.find(e => e.idEstudiante == idStudent && e.idMateria == idSubject)?.valor
    return v ? v : 0;
  }

  public getId(c: Calificacion[], idStudent: number, idSubject: number): number {
    let v = c.find(e => e.idEstudiante == idStudent && e.idMateria == idSubject)?.id
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

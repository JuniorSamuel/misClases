import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClaseApiService } from 'src/app/core/service/clase-api.service';
import { Estudiante } from 'src/app/interface/estudiante.interface';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  public searchField: string = '';
  public Estudiantes: Estudiante[] = [];
  public formStudent: FormGroup;
  public statuModal = 'a'

  constructor(private claseApi: ClaseApiService, private formBuilder: FormBuilder) {
    this.formStudent = formBuilder.group({
      id: 0,
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      comentario: ['']
    })
  }

  ngOnInit(): void {
    this.claseApi.Estudiante.getAll()
      .subscribe((res) => {
        this.Estudiantes = res;
      })
  }

  /**
   * addStudent
   * @description Add a new Student to the list.
   */
  public addStudent() {

    document.getElementById("form-student")?.classList.add('was-validated');

    if (this.formStudent.valid) {
      let estudiante: Estudiante = this.formStudent.value;
      estudiante.id =0;
      console.log(estudiante);
      
      this.claseApi.Estudiante.add(estudiante).subscribe((res) => {
        console.log(res);
        document.getElementById("id-close-modal")?.click();
        this.formStudent.reset()
      });
    }
  }

  public deleteStudent(id: number) {
    this.claseApi.Estudiante.delete(id).subscribe((res) => {
      console.log(res);

      this.Estudiantes = this.Estudiantes.filter((e) => e.id !== id);
    })
  }

  public updateStudentModal(id: number, estudiante: Estudiante) {
    document.getElementById("form-student")?.classList.remove('was-validated');
    this.statuModal = 'u'
    this.formStudent.reset()
    this.formStudent.setValue({ id: id, nombre: estudiante.nombre, apellido: estudiante.apellido, comentario: estudiante.comentario });
  }

  public openModal() {
    document.getElementById("form-student")?.classList.remove('was-validated');
    this.statuModal = 'a'
    this.formStudent.reset()
  }

  public updateStudent() {
    document.getElementById("form-student")?.classList.add('was-validated');

    if (this.formStudent.valid) {
      let estudiante: Estudiante = this.formStudent.value
      this.claseApi.Estudiante.update(estudiante.id, estudiante).subscribe((res) => {
        console.log(res);
        
        this.Estudiantes = this.Estudiantes.filter((e) => e.id !== estudiante.id);
        this.Estudiantes.push(res);

        document.getElementById("id-close-modal")?.click();
        this.formStudent.reset()
      })
    }
  }
} 

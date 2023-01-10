import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../interface/student.interface';
import { ClassApiService } from '../../service/class-api.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BsToastService, ToastStyle } from 'src/app/core/service/bs-toast.service';
import { ModalStatus } from '../../enum/modal-status';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  // filterWithPagination
  public searchField: string = '';
  public pagPage: number = 1;
  public pagPageSize: number = 5;
  public pagLengthList: number = 0;
  public pagEventEmitter: EventEmitter<number> = new EventEmitter<number>()
  public Students: Student[] = [];
  
  // add Student
  public formStudent: FormGroup;
  public modalStatus: ModalStatus = ModalStatus.Add;
  public ModalStatus = ModalStatus;
  public student: Student | any = {}

  // Toast
  public ToastSyle = ToastStyle;

  constructor(private claseApi: ClassApiService, private formBuilder: FormBuilder, private ngbModal: NgbModal, private toast: BsToastService) {
    this.formStudent = formBuilder.group({
      id: 0,
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      comment: ['']
    })
  }

  ngOnInit(): void {
    this.getStudents()
    this.pagEventEmitter.subscribe( v => {
      if (v >0) {
        this.pagLengthList = v
      }
    })
  }

  getStudents() {
    this.claseApi.Student.getAll()
      .subscribe((res) => {
        this.Students = res;
      }, err => {
        this.toast.show('Algo salio mal...', {style: ToastStyle.Danger})
      })
  }

  public openModal(content: any, mS:ModalStatus, option:any = null) {
       
    if (option!=null && mS == ModalStatus.Update) {
      document.getElementById("form-student")?.classList.remove('was-validated');
    this.formStudent.reset()
    this.formStudent.setValue({ id: option.id, nombre: option.nombre, apellido: option.apellido, comentario: option.comentario });
    } else if (option!=null && mS == ModalStatus.Delete) {
      this.student = option;
    }

    this.modalStatus = mS;
    this.ngbModal.dismissAll()
    this.ngbModal.open(content, {keyboard: true});
    console.log(option);
  }

  public open(content: any) {
        this.ngbModal.open(content, {keyboard: true});

  }

  public addStudent() {

    document.getElementById("form-student")?.classList.add('was-validated');

    if (this.formStudent.valid) {
      let student: Student = this.formStudent.value;
      student.id = 0;

      this.claseApi.Student.add(student).subscribe((res) => {
        document.getElementById("id-close-modal")?.click();
        this.formStudent.reset()
        this.toast.show('Registro guardado', {style: ToastStyle.Success})

        this.getStudents()
      });
    }
  }

  public deleteStudent(id: number) {
    this.claseApi.Student.delete(id).subscribe((res) => {
      this.Students = this.Students.filter((s) => s.id !== id);
      this.ngbModal.dismissAll()
      this.toast.show('Registro eliminado', {style: ToastStyle.Danger})

    }, err => {
      this.toast.show('Algo salio mal...', {style: ToastStyle.Danger})
    })
  }

  
  public updateStudent() {
    document.getElementById("form-student")?.classList.add('was-validated');

    if (this.formStudent.valid) {
      let student: Student = this.formStudent.value
      this.claseApi.Student.update(student.id, student).subscribe((res) => {
        console.log(res);

        this.Students = this.Students.filter((s) => s.id !== student.id);
        this.Students.unshift(res);

        this.ngbModal.dismissAll()
        this.toast.show('Registro actualizado', {style: ToastStyle.Warning})
        this.formStudent.reset()
      }, err => {
        this.toast.show('Algo salio mal...', {style: ToastStyle.Danger})
      })
    }
  }
} 

import { Component, OnInit, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsToastService } from 'src/app/core/service/bs-toast.service';
import { Materia } from '../../interface/materia.interface';
import { ClassApiService } from '../../service/class-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {

  // filterWithPagination
  public searchField:string = '';
  public pagPage: number = 1;
  public pagPageSize: number = 5;
  public pagLengthList: number = 0;
  public pagEventEmitter: EventEmitter<number> = new EventEmitter<number>()
  public materias: Materia[] = []
  
  // add Materia.
  public form: FormGroup = new FormGroup({title: new FormControl('', Validators.required)})
  public formValidation: boolean = false;

  constructor(private classApi: ClassApiService, private ngbModal: NgbModal, private toast: BsToastService) { }


  ngOnInit(): void {
    this.getData();
    this.pagEventEmitter.subscribe( v => {
      this.pagLengthList = v
    })
  }

  private getData() {
    this.classApi.Materia.getAll().subscribe(
      res => {
        this.materias = res
      }
    )
  }

  public openModal(content: any){
    this.ngbModal.open(content)
  }

  public addMateria(){
    this.formValidation = true;
    if (this.form.valid) {
      let m:Materia = {id: 0, nombre: this.form.controls['title'].value}
      this.classApi.Materia.add(m).subscribe( res => {
        console.log(res);
        this.materias.push(res)
        this.ngbModal.dismissAll()
        this.toast.show(`${m.nombre} fue agregado.`)
      })
    }
  }
}

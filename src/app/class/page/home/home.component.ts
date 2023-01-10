import { Component, OnInit, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsToastService, ToastStyle } from 'src/app/core/service/bs-toast.service';
import { Subject } from '../../interface/subject.interface';
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
  public subjectes: Subject[] = []
  
  // add Subject.
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
    this.classApi.Subject.getAll().subscribe(
      res => {
        this.subjectes = res
      }
    )
  }

  public openModal(content: any){
    this.ngbModal.open(content)
  }

  public addMateria(){
    this.formValidation = true;
    if (this.form.valid) {
      let subject:Subject = {id: 0, name: this.form.controls['title'].value.trim()}
      this.classApi.Subject.add(subject).subscribe( res => {
        console.log(res);
        this.subjectes.push(res)
        this.ngbModal.dismissAll()
        this.toast.show(`${subject.name} fue agregado.`, {style: ToastStyle.Success})
      })
    }
  }
}

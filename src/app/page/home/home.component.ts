import { Component, OnInit } from '@angular/core';
import { ClaseApiService } from 'src/app/core/service/clase-api.service';
import { Materia } from 'src/app/interface/materia.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public searchField: string = "";
  public titleSubject: string = "";
  public validar: boolean = false;
  public Materias: Materia[] = [];
  constructor(private claseApi: ClaseApiService) { }

  ngOnInit(): void {
    
    this.getMaterias();
  }

  getMaterias() {
    this.claseApi.Materia.getAll()
    .subscribe( (res) => {
      console.log(res)
      this.Materias = res;
      })
  }

  addMateria() {
    document.getElementById("form-student=title")?.classList.add('was-validated');
    if (this.titleSubject != "") {
      let materia: Materia = {
        id: 0,
        nombre: this.titleSubject,
        calificacions:  []
      }
      this.claseApi.Materia.add(materia).subscribe(res => {
        document.getElementById("id-close-modal")?.click();
        this.titleSubject = ""
        this.getMaterias();
      });
    }else{
       
    }
  }
}

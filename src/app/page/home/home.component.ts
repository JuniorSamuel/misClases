import { Component, OnInit } from '@angular/core';
import { ClaseApiService } from 'src/app/core/service/clase-api.service';
import { Materia } from 'src/app/interface/materia.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public Materias: Materia[] = [];
  constructor(private claseApi: ClaseApiService) { }

  ngOnInit(): void {
    
    this.claseApi.Materia.getAll()
    .subscribe( (res) => {
      console.log(res)
      this.Materias = res;
      })
  }

}

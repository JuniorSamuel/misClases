import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './pipe/filtro/filtro.pipe';
import { FilterWithPaginationPipe } from './pipe/filterWithPagination/filter-with-pagination.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BadgeDirective } from './directive/badge/badge.directive';


@NgModule({

  imports: [
    CommonModule,
  ],
  declarations: [
    FiltroPipe,
    FilterWithPaginationPipe,
    BadgeDirective
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FiltroPipe,
    FilterWithPaginationPipe,
    NgbModule,
    BadgeDirective
  ]
})
export class SharedModule { }

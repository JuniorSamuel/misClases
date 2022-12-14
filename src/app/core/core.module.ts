import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ClaseApiService } from './service/clase-api.service';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { FiltroPipe } from './pipe/filtro.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModelComponent } from './component/message-model/message-model.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FiltroPipe,
    MessageModelComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ClaseApiService],
  exports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    FormsModule,
    MessageModelComponent
  ]
  
})
export class CoreModule { }

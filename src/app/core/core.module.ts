import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BsToastService } from './service/bs-toast.service';
import { ToastContainerComponent } from './component/toast-container/toast-container.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FootedComponent } from './footed/footed.component';



@NgModule({
    declarations: [HeaderComponent, FootedComponent,ToastContainerComponent],
    exports: [
        HeaderComponent,
        FootedComponent,
        ToastContainerComponent,
    ],
    providers: [BsToastService],
    imports: [
      RouterModule,
        CommonModule,
        NgbToastModule,
    ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() core:CoreModule ){
    if (core) {
        throw new Error("You should import core module only in the root module")
    }
  }
}

import { Injectable, TemplateRef, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export enum ToastStyle {
  Success,
  Warning,
  Danger,
  Primary
}

@Injectable({
  providedIn: 'root'
})
export class BsToastService {

  private bs:BehaviorSubject<any> = new BehaviorSubject<any>({});
  public eventString = this.bs.asObservable()
  

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.bs.next({ textOrTpl, ...options });
  }


  clear() {
    // this.toasts.splice(0, this.toasts.length);
  }
}

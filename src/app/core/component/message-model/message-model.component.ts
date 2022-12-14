import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-model',
  template: '\
  <div class="modal-dialog modal-sm">\
  <div class="modal-content">\
      <div class="modal-header">\
        <h5 class="modal-title"> {{title}}</h5>\
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\
      </div>\
      <div class="modal-body">\
        <p>{{body}}</p>\
      </div>\
      <div class="modal-footer">\
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{textBtnClose}}</button>\
        <button type="button" class="btn btn-primary">{{textBtnOk}}</button>\
      </div>\
    </div>\
  </div>',

})
export class MessageModelComponent implements OnInit {

  @Input() title = 'Mensaje'
  @Input() body = "Mensaje"
  @Input() textBtnClose = "Cancelar"
  @Input() textBtnOk = "Ok"
  constructor() { }

  ngOnInit(): void {
  }

}

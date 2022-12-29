import { NgIf, NgTemplateOutlet, NgFor } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { BsToastService, ToastStyle } from '../../service/bs-toast.service';

@Component({
	selector: 'app-toasts',
	templateUrl: './toast-container.component.html',
	host: { class: 'toast-container position-fixed bottom-0 end-0 p-3', style: 'z-index: 1200' },
})
export class ToastContainerComponent implements OnInit {

	public toasts: any[] = []
	public event: Observable<{}>;
	public ToastStyle = ToastStyle;

	constructor(public toastService: BsToastService) {
		this.event = toastService.eventString
	}
	ngOnInit(): void {
		this.event.subscribe(res => {
			if (Object.entries(res).length !== 0) {
				this.toasts.push(res);
				console.log(res);
				
			}
		})
	}
	remove(toast: any) {
		this.toasts = this.toasts.filter((t) => t !== this.toasts);
	}
}

import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

interface optBadge {
  danger?: string,
  warning?: string,
  success?: string,
  primary?: string,
  default?: string
}

@Directive({
  selector: '[bsBadge]'
})
export class BadgeDirective implements OnInit {

  @Input('bsBadge') value: string | number = '';
  @Input() opt: optBadge | any = { default: 'primary' };

  private elementBadge: HTMLSpanElement | null;
  constructor(private element: ElementRef<HTMLSpanElement>) {
    this.elementBadge = element.nativeElement;

  }


  ngOnInit() {
    if (this.elementBadge)
      this.elementBadge.textContent = this.value.toString();
    this.setBadge();
  }

  setBadge() {
    let dS: string = this.opt.default
    let args: string[] = Object.keys(this.opt);

    args.forEach(arg => {
      let element = this.opt[arg];
      let { v, c } = this.getValueAndCondition(element);

      switch (c) {
        case '=':
          if (this.value == v)
            this.elementBadge?.classList.add('badge', `text-bg-${arg}`)
          else
            this.setDefault()
          break;

        case '<=':
          if (+this.value <= +v)
            this.elementBadge?.classList.add('badge', `text-bg-${arg}`)
          else
            this.setDefault()

          break;

        case '>=':
          if (+this.value >= +v)
            this.elementBadge?.classList.add('badge', `text-bg-${arg}`)
          else
            this.setDefault()

          break;

        case '!=':
          if (this.value != v)
            this.elementBadge?.classList.add('badge', `text-bg-${arg}`)
          else
            this.setDefault()

          break;

        default:
          this.setDefault
          break;
      }

    })
  }

  setDefault() {
    this.elementBadge?.classList.add('text-mute');

  }

  getValueAndCondition(value: string): { v: any, c: any } {
    let r = {v: '', c: ''}
    let indexEqual  =  value.indexOf("=");
    indexEqual = indexEqual < 0 ? 0 :indexEqual;

    r.v = value.slice(indexEqual + 1);
    r.c = value.slice(0, indexEqual == 0 ? 1: indexEqual + 1)
    return r;
  }


}
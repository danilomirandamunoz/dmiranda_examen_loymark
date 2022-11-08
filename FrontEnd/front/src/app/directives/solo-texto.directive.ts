import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSoloTexto]'
})
export class SoloTextoDirective {

  
  // Allow decimal numbers and negative values
  private regex: RegExp = new RegExp(/^([a-zA-Z ]*)$/g);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = [
      "Backspace",
      "Tab",
      "End",
      "Home",
      "ArrowLeft",
      "ArrowRight",
      "Del",
      "Delete",
      "Dead"
  ];

  constructor(private el: ElementRef) { }
  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
      // console.log(this.el.nativeElement.value);
      // Allow Backspace, tab, end, and home keys
      if (this.specialKeys.indexOf(event.key) !== -1) {
          return;
      }
      let current: string = this.el.nativeElement.value;
      const position = this.el.nativeElement.selectionStart;
      const next: string = [
          current.slice(0, position),
          event.key,
          current.slice(position)
      ].join("");
      console.log(this.regex);
      console.log(next);
      
      
      if (next && !String(next).match(this.regex)) {
          event.preventDefault();
      }
  }
}
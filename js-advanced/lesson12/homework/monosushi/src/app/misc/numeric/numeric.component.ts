import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-numeric',
  templateUrl: './numeric.component.html',
  styleUrls: ['./numeric.component.scss']
})
export class NumericComponent {
  @Input('value')
  public value = 1;

  @Output() public changeEvent = new EventEmitter<number>();

  minus(): void {
    if (this.value > 1) this.changeEvent.emit(--this.value);
    else this.changeEvent.emit(this.value);
  }

  plus(): void {
    if (this.value < 99) this.changeEvent.emit(++this.value);
    else this.changeEvent.emit(this.value);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'routinglist';
  public onMain: boolean = true;

  goInside(inside: boolean) { this.onMain = !inside; }
}

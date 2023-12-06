import { Component } from '@angular/core';
import { conf } from 'src/core/conf';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public ui = {
    conf: {
      workFrom: conf.workFrom,
      workTo: conf.workTo,
      workDay: conf.workDay,
      deliveryPoints: conf.deliveryPoints,
    },
  };
}

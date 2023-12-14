import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryComponent } from './delivery.component';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { MiscModule } from 'src/app/misc/misc.module';

@NgModule({
  declarations: [DeliveryComponent],
  imports: [CommonModule, DeliveryRoutingModule, MiscModule],
})
export class DeliveryModule {}

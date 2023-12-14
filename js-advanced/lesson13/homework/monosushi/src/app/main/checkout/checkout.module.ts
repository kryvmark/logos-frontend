import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MiscModule } from 'src/app/misc/misc.module';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [CommonModule, CheckoutRoutingModule, ReactiveFormsModule, MiscModule],
})
export class CheckoutModule {}

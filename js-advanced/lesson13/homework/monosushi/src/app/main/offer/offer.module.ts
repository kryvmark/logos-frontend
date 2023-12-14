import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferRoutingModule } from './offer-routing.module';
import { OfferComponent } from './offer.component';
import { HttpClientModule } from '@angular/common/http';
import { OfferInfoComponent } from './info/offer-info.component';

@NgModule({
  declarations: [OfferComponent, OfferInfoComponent],
  imports: [CommonModule, OfferRoutingModule, HttpClientModule],
})
export class OfferModule {}

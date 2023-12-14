import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OfferComponent } from './offer.component';
import { OfferInfoComponent } from './info/offer-info.component';

import { marketResolver, offerResolver } from 'src/core/resolvers/resolvers';

const routes: Routes = [
  {
    path: '',
    component: OfferComponent,
    resolve: { response: marketResolver },
  },
  {
    path: ':id',
    component: OfferInfoComponent,
    resolve: { response: offerResolver },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { OfferComponent } from './main/offer/offer.component';
import { OfferInfoComponent } from './main/offer/info/offer-info.component';
import { ProductComponent } from './main/product/product.component';
import { ProductInfoComponent } from './main/product/info/product-info.component';
import { DeliveryComponent } from './main/delivery/delivery.component';
import { AboutComponent } from './main/about/about.component';
import { AdminComponent } from './main/admin/admin.component';
import { TermsComponent } from './main/terms/terms.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'offer', component: OfferComponent },
  { path: 'offer/:id', component: OfferInfoComponent },
  { path: 'product/:path', component: ProductComponent },
  { path: 'product/:path/:name', component: ProductInfoComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'admin',
    children: [
      {
        path: 'offer',
        component: AdminComponent,
      },
      {
        path: 'product',
        component: AdminComponent,
      },
      {
        path: 'item',
        component: AdminComponent,
      },
      {
        path: 'order',
        component: AdminComponent,
      },
      {
        path: '',
        redirectTo: 'offer',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'offer',
        pathMatch: 'full',
      },
    ],
  },
  { path: 'terms', component: TermsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

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
import {
  itemResolver,
  marketResolver,
  offerResolver,
  productResolver,
} from 'src/core/resolvers/resolvers';

const routes: Routes = [
  { path: '', component: MainComponent, resolve: { response: marketResolver } },
  {
    path: 'offers',
    component: OfferComponent,
    resolve: { response: marketResolver },
  },
  {
    path: 'offers/:id',
    component: OfferInfoComponent,
    resolve: { response: offerResolver },
  },
  {
    path: 'products/:name',
    component: ProductComponent,
    resolve: { response: productResolver },
  },
  {
    path: 'products/:name/:path',
    component: ProductInfoComponent,
    resolve: { response: itemResolver },
  },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'admin',
    children: [
      {
        path: 'offers',
        component: AdminComponent,
        resolve: { response: marketResolver },
      },
      {
        path: 'products',
        component: AdminComponent,
        resolve: { response: marketResolver },
      },
      {
        path: 'items',
        component: AdminComponent,
        resolve: { response: marketResolver },
      },
      {
        path: 'orders',
        component: AdminComponent,
        resolve: { response: marketResolver },
      },
      {
        path: '',
        redirectTo: 'offer',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'offers',
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

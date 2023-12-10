import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { OfferComponent } from './main/offer/offer.component';
import { OfferInfoComponent } from './main/offer/info/offer-info.component';
import { ProductComponent } from './main/product/product.component';
import { ProductInfoComponent } from './main/product/info/product-info.component';
import { DeliveryComponent } from './main/delivery/delivery.component';
import { AboutComponent } from './main/about/about.component';
import { ProfileComponent } from './main/profile/profile.component';
import { AdminComponent } from './main/admin/admin.component';
import { TermsComponent } from './main/terms/terms.component';
import { CheckoutComponent } from './main/checkout/checkout.component';
import { LoginComponent } from './main/login/login.component';

import {
  itemResolver,
  marketResolver,
  offerResolver,
  productResolver,
} from 'src/core/resolvers/resolvers';
import { adminGuard, loginGuard, profileGuard } from 'src/core/guards/guards';

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
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  {
    path: 'profile',
    canActivateChild: [profileGuard],
    children: [
      {
        path: 'main',
        component: ProfileComponent,
      },
      {
        path: 'history',
        component: ProfileComponent,
      },
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'main',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'admin',
    canActivateChild: [adminGuard],
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
  {
    path: 'checkout',
    component: CheckoutComponent,
    resolve: { response: marketResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

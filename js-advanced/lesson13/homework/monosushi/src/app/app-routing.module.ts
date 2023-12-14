import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'offers',
    loadChildren: () => import('./main/offer/offer.module').then((m) => m.OfferModule),
  },
  {
    path: 'products',
    loadChildren: () => import('./main/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'delivery',
    loadChildren: () => import('./main/delivery/delivery.module').then((m) => m.DeliveryModule),
  },
  {
    path: 'about',
    loadChildren: () => import('./main/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'checkout',
    loadChildren: () => import('./main/checkout/checkout.module').then((m) => m.CheckoutModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./main/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./main/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./main/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'terms',
    loadChildren: () => import('./main/terms/terms.module').then((m) => m.TermsModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

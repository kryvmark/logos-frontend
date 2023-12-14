import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductInfoComponent } from './info/product-info.component';

import { itemResolver, productResolver } from 'src/core/resolvers/resolvers';

const routes: Routes = [
  {
    path: ':name',
    component: ProductComponent,
    resolve: { response: productResolver },
  },
  {
    path: ':name/:path',
    component: ProductInfoComponent,
    resolve: { response: itemResolver },
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}

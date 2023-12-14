import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';

import { marketResolver, ordersResolver } from 'src/core/resolvers/resolvers';
import { adminGuard } from 'src/core/guards/guards';

const routes: Routes = [
  {
    path: '',
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
        resolve: { response: ordersResolver },
      },
      {
        path: '',
        redirectTo: 'offers',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'offers',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

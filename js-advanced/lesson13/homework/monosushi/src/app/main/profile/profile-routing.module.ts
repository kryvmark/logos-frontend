import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';

import { historyResolver } from 'src/core/resolvers/resolvers';
import { profileGuard } from 'src/core/guards/guards';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [profileGuard],
    children: [
      {
        path: 'main',
        component: ProfileComponent,
      },
      {
        path: 'history',
        component: ProfileComponent,
        resolve: { response: historyResolver },
      },
      {
        path: 'password',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}

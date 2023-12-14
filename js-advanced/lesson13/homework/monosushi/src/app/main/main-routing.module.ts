import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';

import { marketResolver } from 'src/core/resolvers/resolvers';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    resolve: { response: marketResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}

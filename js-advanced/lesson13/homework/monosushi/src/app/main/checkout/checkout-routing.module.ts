import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { checkoutGuard } from 'src/core/guards/guards';
import { marketResolver } from 'src/core/resolvers/resolvers';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    canActivate: [checkoutGuard],
    resolve: { response: marketResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}

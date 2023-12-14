import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ItemComponent } from './item/item.component';
import { NumericComponent } from './numeric/numeric.component';
import { UsersComponent } from './users/users.component';
import { CallComponent } from './call/call.component';
import { CartComponent } from './cart/cart.component';
import { MapComponent } from './map/map.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';

const MATERIAL = [
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
];

@NgModule({
  declarations: [
    ItemComponent,
    NumericComponent,
    UsersComponent,
    CallComponent,
    CartComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    RouterModule,
    ...MATERIAL,
  ],
  exports: [
    ItemComponent,
    NumericComponent,
    UsersComponent,
    CallComponent,
    CartComponent,
    MapComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MiscModule {}

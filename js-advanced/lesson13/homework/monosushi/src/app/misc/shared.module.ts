import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ProfileComponent } from './../main/profile/profile.component';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { CallComponent } from './call/call.component';

const MATERIAL = [
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
];

@NgModule({
  declarations: [ProfileComponent, UsersComponent, CallComponent],
  imports: [CommonModule, AppRoutingModule, FormsModule, ReactiveFormsModule, ...MATERIAL],
})
export class SharedModule {}

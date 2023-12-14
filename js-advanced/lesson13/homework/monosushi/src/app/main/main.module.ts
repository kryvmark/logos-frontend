import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MiscModule } from '../misc/misc.module';
import { register } from 'swiper/element/bundle';
import { MainComponent } from './main.component';
import { HttpClientModule } from '@angular/common/http';

register();

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MiscModule,
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainModule {}

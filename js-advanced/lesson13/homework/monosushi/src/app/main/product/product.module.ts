import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductInfoComponent } from './info/product-info.component';
import { HttpClientModule } from '@angular/common/http';
import { MiscModule } from 'src/app/misc/misc.module';
import { FilterPipe } from 'src/core/filter/filter.pipe';

@NgModule({
  declarations: [ProductComponent, ProductInfoComponent, FilterPipe],
  imports: [CommonModule, ProductRoutingModule, HttpClientModule, MiscModule],
})
export class ProductModule {}

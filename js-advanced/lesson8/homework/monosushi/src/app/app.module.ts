import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';

import { DeliveryComponent } from './main/delivery/delivery.component';
import { AboutComponent } from './main/about/about.component';
import { OfferComponent } from './main/offer/offer.component';
import { OfferInfoComponent } from './main/offer/info/offer-info.component';
import { ProductComponent } from './main/product/product.component';
import { TermsComponent } from './main/terms/terms.component';
import { AdminComponent } from './main/admin/admin.component';
import { MapComponent } from './misc/map/map.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment.development';
import { register } from 'swiper/element/bundle';

register();

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    DeliveryComponent,
    AboutComponent,
    OfferComponent,
    OfferInfoComponent,
    ProductComponent,
    TermsComponent,
    AdminComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}

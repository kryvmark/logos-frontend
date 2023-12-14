import { SwiperContainer } from 'swiper/element';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';

import { MainComponent } from './main.component';
import { FilterPipe } from 'src/core/filter/filter.pipe';
import { of } from 'rxjs';
import Swiper from 'swiper';

xdescribe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MainComponent, FilterPipe],
      providers: [
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ response: { offers: [], products: [], items: [] } }),
          },
        },
        {
          provide: ElementRef<SwiperContainer>,
          useValue: {},
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

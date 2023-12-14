import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { OfferInfoComponent } from './offer-info.component';

describe('OfferInfoComponent', () => {
  let component: OfferInfoComponent;
  let fixture: ComponentFixture<OfferInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [OfferInfoComponent],
    });
    fixture = TestBed.createComponent(OfferInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

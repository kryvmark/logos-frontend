import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { marketResolver, offerResolver, productResolver } from './resolvers';
import { Market, MarketOffer, MarketProduct } from '../types';

describe('marketResolver', () => {
  const executeResolver: ResolveFn<Market | undefined> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => marketResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

describe('offerResolver', () => {
  const executeResolver: ResolveFn<MarketOffer | undefined> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => offerResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

describe('productResolver', () => {
  const executeResolver: ResolveFn<MarketProduct | undefined> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => productResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

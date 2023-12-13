import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import {
  historyResolver,
  itemResolver,
  marketResolver,
  offerResolver,
  ordersResolver,
  productResolver,
} from './resolvers';
import {
  Market,
  MarketOffer,
  MarketOrder,
  MarketProduct,
  MarketProductItem,
} from '../types';

describe('marketResolver', () => {
  const executeResolver: ResolveFn<Market | undefined> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() => marketResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

describe('ordersResolver', () => {
  const executeResolver: ResolveFn<MarketOrder[] | undefined> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() => ordersResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

describe('historyResolver', () => {
  const executeResolver: ResolveFn<MarketOrder[] | undefined> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() => historyResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

describe('offerResolver', () => {
  const executeResolver: ResolveFn<MarketOffer | undefined> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() => offerResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

describe('productResolver', () => {
  const executeResolver: ResolveFn<MarketProduct | undefined> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() => productResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

describe('itemResolver', () => {
  const executeResolver: ResolveFn<MarketProductItem | undefined> = (
    ...resolverParameters
  ) => TestBed.runInInjectionContext(() => itemResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

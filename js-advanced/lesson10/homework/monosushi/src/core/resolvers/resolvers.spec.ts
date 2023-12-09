import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { productResolver } from './resolvers';
import { MarketProduct } from '../types';

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

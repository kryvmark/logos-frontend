import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { MarketProduct } from '../types';
import { inject } from '@angular/core';
import { MarketService } from '../market/market.service';
import { map } from 'rxjs';

export const productResolver: ResolveFn<MarketProduct | undefined> = (
  route: ActivatedRouteSnapshot
) => {
  const market = inject(MarketService);

  if (!market.records) {
    return market
      .read()
      .pipe(
        map(() =>
          market.records.products.find(
            (product) => product.path == route.paramMap.get('name')
          )
        )
      );
  } else {
    return market.records.products.find(
      (product) => product.path == route.paramMap.get('name')
    );
  }
};

import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import {
  Market,
  MarketOffer,
  MarketProduct,
  MarketProductItem,
} from '../types';
import { inject } from '@angular/core';
import { MarketService } from '../market/market.service';
import { map } from 'rxjs';

export const marketResolver: ResolveFn<Market | undefined> = () => {
  const market = inject(MarketService);

  if (!market.records) return market.read().pipe(map(() => market.records));
  else return market.records;
};

export const offerResolver: ResolveFn<MarketOffer | undefined> = (
  route: ActivatedRouteSnapshot
) => {
  const market = inject(MarketService);

  if (!market.records) {
    return market
      .read()
      .pipe(
        map(() =>
          market.records.offers.find(
            (offer) => offer.id == route.paramMap.get('id')?.toString()
          )
        )
      );
  } else {
    return market.records.offers.find(
      (offer) => offer.id == route.paramMap.get('id')?.toString()
    );
  }
};

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

export const itemResolver: ResolveFn<MarketProductItem | undefined> = (
  route: ActivatedRouteSnapshot
) => {
  const market = inject(MarketService);

  if (!market.records) {
    return market.read().pipe(
      map(() => {
        const product = market.records.products.find(
          (product) => product.path == route.paramMap.get('name')
        );

        if (product) {
          const item = market.records.items.find(
            (item) => item.path == route.paramMap.get('path')
          );

          if (item) {
            const { name, path } = product;
            const view: MarketProductItem = { name, path, item };
            return view;
          } else
            return {
              name: product.name,
              path: product.path,
              item: null,
            };
        }
        return;
      })
    );
  } else {
    const product = market.records.products.find(
      (product) => product.path == route.paramMap.get('name')
    );

    if (product) {
      const item = market.records.items.find(
        (item) => item.path == route.paramMap.get('path')
      );

      if (item) {
        const { name, path } = product;
        const view: MarketProductItem = { name, path, item };
        return view;
      }
    }
    return;
  }
};

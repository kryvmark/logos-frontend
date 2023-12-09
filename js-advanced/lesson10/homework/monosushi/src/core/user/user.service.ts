import { Injectable } from '@angular/core';
import { MarketItem, MarketStoredItem } from '../types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _items!: MarketItem[];

  constructor() { }

  readStoredItems(): MarketStoredItem[] {
    const items: MarketStoredItem[] = [];
    const cart = JSON.parse(localStorage.getItem('cart') ?? '{}');

    if (cart instanceof Array) {
      cart.forEach(item => {
        if (item.id && item.qty) {
          items.push(item);
        }
      });
    }

    return items;
  }
}

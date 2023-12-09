import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  MarketCart,
  MarketItem,
  MarketOrderItem,
  MarketStoredItem,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _cart!: MarketCart;
  private _subject = new Subject<void>();
  private _storedItems: MarketStoredItem[] = [];

  constructor() {}

  getCart(items: MarketItem[]): MarketCart {
    const orderItems: MarketOrderItem[] = [];
    const total = { price: 0, items: 0 };
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');

    if (cart instanceof Array) {
      cart.forEach((record) => {
        if (record.id && record.qty) {
          const item = items.find((rec) => rec.id == record.id);
          if (item) {
            orderItems.push({
              id: record.id,
              name: item.name,
              logo: item.logo,
              price: parseInt(item.price),
              qty: record.qty,
            });
            total.price += parseInt(item.price) * record.qty;
            total.items += record.qty;
          }
        }
      });
    }

    this._cart = { total, items: orderItems };
    this._storedItems = [];
    this.cart.items.forEach((record) => {
      const { id, qty } = record;
      this._storedItems.push({ id, qty });
    });
    return this.cart;
  }

  addItem(item: MarketStoredItem): void {
    const { id, qty } = item;
    const match = this._storedItems.find((record) => record.id == id);
    if (match) match.qty += qty;
    else this._storedItems.push({ id, qty });

    localStorage.setItem('cart', JSON.stringify(this._storedItems));
    this.subject.next();
  }

  changeQty(i: number, qty: number): void {
    this._storedItems[i].qty = qty;
    localStorage.setItem('cart', JSON.stringify(this._storedItems));
    this.subject.next();
  }

  removeItem(i: number): void {
    this._storedItems.splice(i, 1);
    localStorage.setItem('cart', JSON.stringify(this._storedItems));
    this.subject.next();
  }

  get cart(): MarketCart {
    return this._cart;
  }

  get subject(): Subject<void> {
    return this._subject;
  }
}

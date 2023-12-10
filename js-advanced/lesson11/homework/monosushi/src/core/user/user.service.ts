import { Observable, Subject, map } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  MarketCart,
  MarketItem,
  MarketOrderItem,
  MarketStoredItem,
  User,
} from '../types';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _subject = new Subject<void>();
  private _cart!: MarketCart;
  private _storedItems: MarketStoredItem[] = [];

  private _user!: User;

  constructor(private http: HttpClient) {}

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

  get subject(): Subject<void> {
    return this._subject;
  }

  get cart(): MarketCart {
    return this._cart;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(`${environment.backendUrl}/users`).pipe(
      map((users) => {
        const user = users.find(
          (u) => u.email == email && u.password == password
        );
        if (user) {
          this._user = user;
          if (!localStorage.getItem('user')) {
            localStorage.setItem(
              'user',
              JSON.stringify({ email, password: password })
            );
          }
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  get firstName(): string | undefined {
    return this._user.firstName;
  }

  get lastName(): string | undefined {
    return this._user.lastName;
  }

  get email(): string | undefined {
    return this._user.email;
  }

  get admin(): boolean | undefined {
    return this._user.admin;
  }
}

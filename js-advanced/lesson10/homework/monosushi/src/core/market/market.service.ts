import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Market,
  MarketCart,
  MarketItem,
  MarketOffer,
  MarketPath,
  MarketProduct,
} from '../types';
import { Observable, Subject, forkJoin, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  private _cart!: MarketCart;
  private _records!: Market;
  private _subject = new Subject<void>();

  constructor(private http: HttpClient) {}

  read(): Observable<void> {
    return forkJoin([
      this.http.get<MarketOffer[]>(`${environment.backendUrl}/offers`),
      this.http.get<MarketProduct[]>(`${environment.backendUrl}/products`),
      this.http.get<MarketItem[]>(`${environment.backendUrl}/items`),
    ]).pipe(
      map((data) => {
        const [ offers, products, items ] = data;
        this._records = { offers, products, items };
      })
    );
  }

  image(path: MarketPath, name: string) {
    return `https://firebasestorage.googleapis.com/v0/b/monosushi-63969.appspot.com/o/upload%2F${path}%2F${name}?alt=media`;
  }

  get cart(): MarketCart {
    return this._cart;
  }

  get records(): Market {
    return this._records;
  }

  get subject(): Subject<void> {
    return this._subject;
  }
}

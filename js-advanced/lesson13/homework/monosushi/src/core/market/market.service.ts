import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Market,
  MarketItem,
  MarketOffer,
  MarketPath,
  MarketProduct,
} from '../types';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  private _records!: Market;

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

  get records(): Market {
    return this._records;
  }
}

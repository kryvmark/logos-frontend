import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarketPath, MarketRecord } from '../types';
import { Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
  Storage,
  deleteObject,
  UploadResult,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  private _cart = new Subject<void>;

  constructor(private http: HttpClient, private storage: Storage) {}

  create<T extends MarketRecord>(path: MarketPath, record: T): Observable<T> {
    return this.http.post<T>(`${environment.backendUrl}/${path}`, record);
  }

  read<T extends MarketRecord>(path: MarketPath): Observable<T[]> {
    return this.http.get<T[]>(`${environment.backendUrl}/${path}`);
  }

  readOne<T extends MarketRecord>(
    path: MarketPath,
    needle: number | string
  ): Observable<T> {
    switch (typeof needle) {
      case 'number':
        return this.http.get<T>(`${environment.backendUrl}/${path}/${needle}`);
      case 'string':
        return this.http
          .get<T>(`${environment.backendUrl}/${path}?path=${needle}`)
          .pipe(map((record: any) => record[0]));
    }
  }

  update<T extends MarketRecord>(path: MarketPath, record: T): Observable<T> {
    return this.http.patch<T>(
      `${environment.backendUrl}/${path}/${record.id}`,
      record
    );
  }

  delete<T extends MarketRecord>(path: MarketPath, id: number): Observable<T> {
    return this.http.delete<T>(`${environment.backendUrl}/${path}/${id}`);
  }

  image(path: MarketPath, name: string) {
    return `https://firebasestorage.googleapis.com/v0/b/monosushi-63969.appspot.com/o/upload%2F${path}%2F${name}?alt=media`;
  }

  async upload(
    path: MarketPath,
    name: string,
    file: File
  ): Promise<UploadResult> {
    return uploadBytes(ref(this.storage, `upload/${path}/${name}`), file);
  }

  async erase(path: MarketPath, name: string): Promise<void> {
    return deleteObject(ref(this.storage, `upload/${path}/${name}`));
  }

  get cart() {
    return this._cart;
  }
}

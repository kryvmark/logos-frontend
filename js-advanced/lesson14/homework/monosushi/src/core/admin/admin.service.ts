import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarketRecord, MarketPath, MarketOrder } from '../types';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
  Storage,
  deleteObject,
  UploadResult,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import {
  Firestore,
  collection,
  doc,
  docData,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private _orders!: MarketOrder[];

  constructor(
    private http: HttpClient,
    private db: Firestore,
    private storage: Storage
  ) {}

  create<T extends MarketRecord>(
    path: MarketPath,
    record: T
  ): Observable<void> {
    return this.http.post<void>(`${environment.backendUrl}/${path}`, record);
  }

  async readOrders(): Promise<void> {
    const users = (await getDocs(collection(this.db, 'users'))).docs;
    users.forEach(async (user) => {
      this._orders = [];
      const orders = (
        await getDocs(collection(this.db, 'users', user.id, 'orders'))
      ).docs;
      orders.forEach((order) => {
        const _order = { ...order.data() } as MarketOrder;
        this._orders.push({ id: order.id, uid: user.id, ..._order });
      });
      this._orders.sort((a, b) => b.date - a.date);
    });
  }

  async confirmOrder(i: number): Promise<void> {
    const id = this.orders[i].id;
    const uid = this.orders[i].uid;
    if (id && uid) {
      updateDoc(doc(this.db, 'users', uid, 'orders', id), { complete: true });
    }
  }

  update<T extends MarketRecord>(
    path: MarketPath,
    record: T
  ): Observable<void> {
    return this.http.patch<void>(
      `${environment.backendUrl}/${path}/${record.id}`,
      record
    );
  }

  delete(path: MarketPath, id: number): Observable<void> {
    return this.http.delete<void>(`${environment.backendUrl}/${path}/${id}`);
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

  get orders(): MarketOrder[] {
    return this._orders;
  }
}

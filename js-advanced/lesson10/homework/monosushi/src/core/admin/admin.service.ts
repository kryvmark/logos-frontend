import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarketRecord, MarketPath } from '../types';
import { Observable } from 'rxjs';
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
export class AdminService {
  constructor(private http: HttpClient, private storage: Storage) {}

  create<T extends MarketRecord>(
    path: MarketPath,
    record: T
  ): Observable<void> {
    return this.http.post<void>(`${environment.backendUrl}/${path}`, record);
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
}

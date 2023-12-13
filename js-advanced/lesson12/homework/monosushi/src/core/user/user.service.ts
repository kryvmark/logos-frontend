import { User } from './../types';
import { Subject, firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  MarketCart,
  MarketItem,
  MarketOrder,
  MarketOrderItem,
  MarketStoredItem,
} from '../types';
import { HttpClient } from '@angular/common/http';
import {
  signInWithEmailAndPassword,
  signOut,
  User as AuthUser,
  Auth,
} from '@angular/fire/auth';
import {
  addDoc,
  collection,
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
  getDocs,
} from '@angular/fire/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _subject = new Subject<void>();
  private _cart!: MarketCart;
  private _storedItems: MarketStoredItem[] = [];

  private _user!: User;

  constructor(
    private auth: Auth,
    private db: Firestore,
    private http: HttpClient
  ) {}

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
              product: item.product,
              path: item.path,
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

  async checkout(order: MarketOrder): Promise<void> {
    if (this.id) {
      addDoc(collection(this.db, 'users', this.id, 'orders'), order);
      localStorage.removeItem('cart');
    }
  }

  async repeatOrder(i: number): Promise<void> {
    if (this.id && this.orders) {
      const order: MarketOrder = {...this.orders[i]};
      delete order.id;
      order.date = Date.now();
      order.complete = false;
      addDoc(collection(this.db, 'users', this.id, 'orders'), order);
    }
  }

  get subject(): Subject<void> {
    return this._subject;
  }

  get cart(): MarketCart {
    return this._cart;
  }

  async checkLogin(): Promise<boolean> {
    const user: AuthUser | null = await new Promise((resolve) => {
      const unsubscribe = this.auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      });
    });

    if (user) {
      const data = await firstValueFrom(
        docData(doc(this.db, 'users', user.uid))
      );

      if (data) {
        const _user: User = {
          id: user.uid,
          email: data['email'],
          phone: data['phone'],
          firstName: data['firstName'],
          lastName: data['lastName'],
          admin: data['admin'],
          addresses: data['addresses'],
        };

        const orders = (await getDocs(collection(this.db, 'users', user.uid, 'orders'))).docs;
        _user.orders = new Array<MarketOrder>();
        orders.forEach((order) => {
          const _order = { ...order.data() } as MarketOrder;
          _user.orders!.push({ id: order.id, ..._order });
        });

        _user.orders.sort((a, b) => b.date - a.date);
        this._user = _user;
        return true;
      }
      return false;
    }
    return false;
  }

  async login(email: string, password: string): Promise<boolean> {
    const login = await signInWithEmailAndPassword(this.auth, email, password)
      .then((credential) => Promise.resolve(credential))
      .catch(() => Promise.resolve(null));

    if (login) {
      const data = await firstValueFrom(
        docData(doc(this.db, 'users', login.user.uid))
      );

      if (data) {
        const _user: User = {
          id: login.user.uid,
          email: data['email'],
          phone: data['phone'],
          firstName: data['firstName'],
          lastName: data['lastName'],
          admin: data['admin'],
          addresses: data['addresses'],
        };

        const orders = (await getDocs(collection(this.db, 'users', login.user.uid, 'orders'))).docs;
        _user.orders = new Array<MarketOrder>();
        orders.forEach((order) => {
          const _order = { ...order.data() } as MarketOrder;
          _user.orders!.push({ id: order.id, ..._order });
        });

        _user.orders.sort((a, b) => b.date - a.date);
        this._user = _user;
        return true;
      }
      return false;
    }
    return false;
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch {}
  }

  async register(user: User, password: string): Promise<void> {
    const login = await createUserWithEmailAndPassword(
      this.auth,
      user.email,
      password
    );
    user.admin = false;
    setDoc(doc(this.db, 'users', login.user.uid), user);
  }

  async updateAddress(i: number, address: string): Promise<void> {
    if (this.id) {
      const addresses = this._user.addresses;
      if (addresses) {
        addresses[i] = address;
        if (!address) addresses.splice(i, 1);
        updateDoc(doc(this.db, 'users', this.id), { addresses });
      }
    }
  }

  async deleteAddress(i: number): Promise<void> {
    if (this.id) {
      const addresses = this._user.addresses;
      if (addresses) {
        addresses.splice(i, 1);
        updateDoc(doc(this.db, 'users', this.id), { addresses });
      }
    }
  }

  async update(data: {
    firstName?: string;
    lastName?: string;
    phone?: number;
  }): Promise<void> {
    if (this.id) updateDoc(doc(this.db, 'users', this.id), data);
  }

  get id(): string | undefined {
    if (this._user) return this._user.id;
    return;
  }

  get email(): string | undefined {
    if (this._user) return this._user.email;
    return;
  }

  get phone(): string | undefined {
    if (this._user) return this._user.phone;
    return;
  }

  get firstName(): string | undefined {
    if (this._user) return this._user.firstName;
    return;
  }

  get lastName(): string | undefined {
    if (this._user) return this._user.lastName;
    return;
  }

  get addresses(): string[] | undefined {
    if (this._user) return this._user.addresses;
    return;
  }

  get orders(): MarketOrder[] | undefined {
    if (this._user) return this._user.orders;
    return;
  }

  get admin(): boolean | undefined {
    if (this._user) return this._user.admin;
    return;
  }
}

import { Component, OnInit } from '@angular/core';
import { MarketService } from 'src/core/market/market.service';
import { MarketItem, MarketOrderItem } from 'src/core/types';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public ui = {
    loaded: false,
    cart: {
      items: 0,
      total: 0,
    },

    itemMapping: new Array<MarketItem>(),
    itemMap: (id: number) => {
      return this.items.find(item => item.id == id);
    },

    firebase: (name: string) => this.market.image('item', name),
    parseInt: (s: string) => parseInt(s),
  };

  public items: MarketItem[] = [];
  public cart: MarketOrderItem[] = [];

  constructor(private market: MarketService) {
    this.market.read<MarketItem>('item').subscribe((items) => {
      this.items = items;
      this.cartUpdate();
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.ui.loaded = true;
    }, 10);
  }

  cartUpdate(): void {
    this.cart = [];
    this.ui.itemMapping = [];

    const jsonCart = localStorage.getItem('cart');

    if (jsonCart) {
      const cart = JSON.parse(jsonCart);

      if (cart instanceof Array) {
        const itemMap: MarketItem[] = [];
        let items = 0;
        let total = 0;

        for (const item of cart) {
          if (typeof item.itemId == 'number') {
            const dbItem = this.items.find(
              (record) => record.id == item.itemId
            );

            if (dbItem && typeof item.qty == 'number') {
              itemMap.push(dbItem);
              this.cart.push(item);
              total += parseInt(dbItem.price) * item.qty;
              items += item.qty;
            }
          }
        }

        this.ui.cart = { items, total };
      }
    }

    this.market.cart.next();
  }

  cartDelete(i: number): void {
    this.cart.splice(i, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartUpdate();
  }

  changeQty(i: number, qty: number): void {
    this.cart[i].qty = qty;
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartUpdate();
  }
}

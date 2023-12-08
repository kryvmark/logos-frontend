import { Component, HostListener, OnDestroy } from '@angular/core';
import { MarketService } from 'src/core/market/market.service';
import { MarketItem, MarketProduct } from 'src/core/types';
import { conf } from '../../core/conf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  public ui = {
    menu: false,
    mobile: true,

    cart: {
      items: 0,
      total: 0,
    },

    cartOpen: false,
    cartToggle: (state?: boolean) => {
      if (this.router.url.split('?')[0].split('/').pop() == 'checkout')
        return (state = false);
      else {
        this.ui.cartOpen = state ?? !this.ui.cartOpen;
        this.onResize();
        return this.ui.cartOpen;
      }
    },

    toggle: (state?: boolean) => {
      this.ui.menu = state ?? !this.ui.menu;
      this.onResize();
      return this.ui.menu;
    },

    logo: (name: string) => this.market.image('product', name),

    conf: {
      workFrom: conf.workFrom,
      workTo: conf.workTo,
      workDay: conf.workDay,
    },
  };

  public products: MarketProduct[] = [];
  public items: MarketItem[] = [];

  public cartSubject = this.market.cart.subscribe(() => {
    this.cartTotal();
  });

  constructor(private market: MarketService, private router: Router) {
    this.onResize();

    market.read<MarketProduct>('product').subscribe((data) => {
      this.products = data;
    });

    market.read<MarketItem>('item').subscribe((data) => {
      this.items = data;
      this.cartTotal();
    });
  }

  ngOnDestroy(): void {
    this.cartSubject.unsubscribe();
  }

  @HostListener('window:resize')
  onResize() {
    this.ui.mobile = window.innerWidth < 1200;

    if (this.ui.mobile) {
      this.ui.menu
        ? window.document.body.classList.add('locked')
        : window.document.body.classList.remove('locked');
    }

    this.ui.cartOpen
      ? window.document.body.classList.add('locked')
      : window.document.body.classList.remove('locked');
  }

  cartTotal(): void {
    const jsonCart = localStorage.getItem('cart');

    if (jsonCart) {
      const cart = JSON.parse(jsonCart);

      if (cart instanceof Array) {
        let items = 0;
        let total = 0;

        for (const item of cart) {
          if (typeof item.itemId == 'number') {
            const dbItem = this.items.find(
              (record) => record.id == item.itemId
            );

            if (dbItem && typeof item.qty == 'number') {
              total += parseInt(dbItem.price) * item.qty;
              items += item.qty;
            }
          }
        }

        this.ui.cart = { items, total };
      }
    }
  }
}

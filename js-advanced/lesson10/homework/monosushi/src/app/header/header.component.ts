import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MarketService } from 'src/core/market/market.service';
import { MarketItem, MarketProduct } from 'src/core/types';
import { conf } from '../../core/conf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
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

    logo: (name: string) => this.market.image('products', name),

    conf: {
      workFrom: conf.workFrom,
      workTo: conf.workTo,
      workDay: conf.workDay,
    },
  };

  public products: MarketProduct[] = [];

  public subject = this.market.subject.subscribe(() => {

  });

  constructor(private market: MarketService, private router: Router) {
    this.onResize();
  }

  ngOnInit(): void {
    if (!this.market.records) {
      this.market.read().subscribe(() => {
        this.products = this.market.records.products;
      });
    } else {
      this.products = this.market.records.products;
    }
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
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
}

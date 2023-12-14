import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MarketService } from 'src/core/market/market.service';
import { MarketCart, MarketItem, MarketProduct } from 'src/core/types';
import { conf } from '../../core/conf';
import { UserService } from 'src/core/user/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UsersComponent } from '../misc/users/users.component';
import { CallComponent } from '../misc/call/call.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public ui = {
    mobile: true,

    menu: false,
    menuToggle: (state?: boolean) => {
      this.ui.menu = state ?? !this.ui.menu;
      this.onResize();
      return this.ui.menu;
    },

    cart: false,
    cartToggle: (state?: boolean) => {
      if (this.router.url.split('?')[0].split('/').pop() == 'checkout')
        return (state = false);
      else {
        this.ui.cart = state ?? !this.ui.cart;
        this.onResize();
        return this.ui.cart;
      }
    },

    logo: (name: string) => this.market.image('products', name),

    conf: {
      workFrom: conf.workFrom,
      workTo: conf.workTo,
      workDay: conf.workDay,
    },
  };

  public cart: MarketCart = {
    total: {
      items: 0,
      price: 0,
    },
    items: [],
  };

  public products: MarketProduct[] = [];
  public items: MarketItem[] = [];

  public subject = this.user.subject.subscribe(() => {
    this.cart = this.user.getCart(this.items);
  });

  constructor(
    private market: MarketService,
    private user: UserService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.onResize();
  }

  ngOnInit(): void {
    if (!this.market.records) {
      this.market.read().subscribe(() => {
        this.products = this.market.records.products;
        this.items = this.market.records.items;
        this.user.subject.next();
      });
    } else {
      this.products = this.market.records.products;
      this.items = this.market.records.items;
      this.user.subject.next();
    }
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }

  @HostListener('window:resize')
  onResize() {
    this.ui.mobile = window.innerWidth < 1200;

    if (this.ui.mobile) {
      this.ui.menu || this.ui.cart
        ? window.document.body.classList.add('locked')
        : window.document.body.classList.remove('locked');
    }
  }

  call(): void {
    this.ui.menuToggle(false);

    this.dialog
      .open(CallComponent, {
        backdropClass: 'dialog_call-back',
        panelClass: 'dialog_call',
        autoFocus: false,
        maxWidth: undefined,
      })
      .afterClosed()
      .subscribe();
  }

  login(): void {
    this.ui.menuToggle(false);

    this.user.checkLogin().then((success) => {
      if (success) {
        if (this.user.admin) this.router.navigateByUrl('/admin/offer');
        else this.router.navigateByUrl('/profile/main');
      } else {
        this.dialog
          .open(UsersComponent, {
            backdropClass: 'dialog_users-back',
            panelClass: 'dialog_users',
            autoFocus: false,
            maxWidth: undefined,
          })
          .afterClosed()
          .subscribe();
      }
    });
  }
}

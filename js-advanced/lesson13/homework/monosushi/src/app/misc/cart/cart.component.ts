import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MarketService } from 'src/core/market/market.service';
import { MarketCart, MarketItem } from 'src/core/types';
import { UserService } from 'src/core/user/user.service';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  public ui = {
    firebase: (name: string) => this.market.image('items', name),
    parseInt: (s: string) => parseInt(s),
  };

  public items: MarketItem[] = [];

  @Input('active')
  public active!: boolean;

  @Input('cart')
  public cart!: MarketCart;

  @Output() closeEvent = new EventEmitter<void>();

  constructor(
    private market: MarketService,
    private user: UserService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  changeQty(i: number, qty: number) {
    this.user.changeQty(i, qty);
  }

  remove(i: number) {
    this.user.removeItem(i);
  }

  checkout() {
    this.user.checkLogin().then((success) => {
      if (success) {
        this.router.navigateByUrl('/checkout');
        this.close();
      }
      else {
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

  close() {
    this.closeEvent.emit();
  }
}

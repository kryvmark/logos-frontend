import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MarketService } from 'src/core/market/market.service';
import { MarketCart, MarketItem, MarketOrderItem } from 'src/core/types';
import { UserService } from 'src/core/user/user.service';

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

  constructor(private market: MarketService, private user: UserService) {}

  changeQty(i: number, qty: number) {
    this.user.changeQty(i, qty);
  }

  remove(i: number) {
    this.user.removeItem(i);
  }

  close() {
    this.closeEvent.emit();
  }
}

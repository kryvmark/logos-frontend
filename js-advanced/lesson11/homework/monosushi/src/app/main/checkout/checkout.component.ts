import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MarketService } from 'src/core/market/market.service';
import { MarketCart, MarketItem } from 'src/core/types';
import { UserService } from 'src/core/user/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public cart!: MarketCart;
  public items: MarketItem[] = [];
  public subject!: Subscription;

  public ui = {
    firebase: (name: string) => this.market.image('items', name),
  };

  constructor(
    private market: MarketService,
    private user: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      if (data['response']) {
        this.items = data['response'].items;
        this.subject = this.user.subject.subscribe(() => {
          this.cart = this.user.getCart(this.items);
        });
        this.user.subject.next();
      }
    });
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }

  changeQty(i: number, qty: number) {
    this.user.changeQty(i, qty);
    this.user.subject.next();
  }

  remove(i: number) {
    this.user.removeItem(i);
    this.user.subject.next();
  }
}

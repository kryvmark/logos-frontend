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
      return this.items.find((item) => item.id == id);
    },

    firebase: (name: string) => this.market.image('items', name),
    parseInt: (s: string) => parseInt(s),
  };

  public items: MarketItem[] = [];
  public cart!: MarketOrderItem[];

  constructor(private market: MarketService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.ui.loaded = true;
    }, 10);
  }
}

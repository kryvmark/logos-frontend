import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MarketService } from 'src/core/market/market.service';
import { MarketItem } from 'src/core/types';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input('item')
  public item!: MarketItem;

  public qty: number = 1;

  public ui = {
    parseInt: (s: string) => parseInt(s),
    firebase: (name: string) => this.market.image('item', name),
  };

  constructor(private market: MarketService) {}

  changeQty(qty: number):void {
    this.qty = qty;
  }
}

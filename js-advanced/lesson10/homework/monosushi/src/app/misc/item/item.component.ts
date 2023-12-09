import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MarketService } from 'src/core/market/market.service';
import { MarketItem, MarketOrderItem } from 'src/core/types';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input('item')
  public item!: MarketItem;

  @Output() public orderEvent = new EventEmitter<MarketOrderItem>();

  public qty: number = 1;

  public ui = {
    parseInt: (s: string) => parseInt(s),
    firebase: (name: string) => this.market.image('items', name),
  };

  constructor(private market: MarketService) {}

  changeQty(qty: number): void {
    this.qty = qty;
  }

  order(): void {
    // if (this.item.id) {
    //   this.orderEvent.emit({
    //     id: this.item.id,
    //     qty: this.qty,
    //   });
    // }
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { conf } from 'src/core/conf';
import { MarketService } from 'src/core/market/market.service';
import {
  MarketOrderItem,
  MarketItemCategory,
  MarketItem,
  MarketProduct,
} from 'src/core/types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  public path = this.route.snapshot.paramMap.get('path')!;
  public product!: MarketProduct;
  public routing!: Subscription;

  public items: MarketItem[] = [];

  public ui = {
    category: '',
    categoryChange: (category: MarketItemCategory | '') => {
      this.ui.category = category;
    },

    workFrom: conf.workFrom,
    workTo: conf.workTo,
    maxDeliveryTime: conf.maxDeliveryTime,
  };

  constructor(
    private market: MarketService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routing = this.route.url.subscribe(() => {
      this.path = this.route.snapshot.paramMap.get('path')!;

      // this.market
      //   .readOne<MarketProduct>('product', this.path)
      //   .subscribe((product) => {
      //     if (product) {
      //       this.product = product;

      //       this.market.read<MarketItem>('item').subscribe((items) => {
      //         this.items = items;
      //       });
      //     } else this.router.navigate(['/'], { replaceUrl: true });
      //   });
    });
  }

  order(item: MarketOrderItem): void {
    let cart = JSON.parse(localStorage.getItem('cart') || JSON.stringify([]));
    if (cart instanceof Array) {
      const found = cart.find((ordered) => ordered.itemId == item.id);

      if (found) found.qty += item.qty;
      else cart.push(item);
    } else cart = [];

    localStorage.setItem('cart', JSON.stringify(cart));
    this.market.subject.next();
  }
}

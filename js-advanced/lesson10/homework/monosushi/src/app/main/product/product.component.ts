import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { conf } from 'src/core/conf';
import { MarketService } from 'src/core/market/market.service';
import { MarketItemCategory, MarketItem, MarketProduct } from 'src/core/types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public product!: MarketProduct;

  public items: MarketItem[] = [];

  public ui = {
    spoiler: false,
    toggle: () => {
      this.ui.spoiler = !this.ui.spoiler;
    },

    category: '',
    categories: conf.categories,
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
    this.route.data.subscribe((data) => {
      if (data['response']) {
        this.product = data['response'] as MarketProduct;
        this.items = this.market.records.items.filter(
          (item) => item.product == this.product.path
        );
      } else this.router.navigate(['/'], { replaceUrl: true });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { conf } from 'src/core/conf';
import { MarketService } from 'src/core/market/market.service';
import { MarketItem, MarketOrderItem, MarketProductItem } from 'src/core/types';
import { UserService } from 'src/core/user/user.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  public ui = {
    qty: 1,
    categories: conf.categories,
    parseInt: (s: string) => parseInt(s),
    firebase: (name: string) => this.market.image('items', name),
  };

  public view!: MarketProductItem;

  constructor(
    private market: MarketService,
    private user: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const view = data['response'];

      if (view) {
        const item = view.item as MarketItem;

        if (item) {
          this.view = view as MarketProductItem;
        } else
          this.router.navigate([`/products/${view.path}`], {
            replaceUrl: true,
          });
      } else this.router.navigate(['/'], { replaceUrl: true });
    });
  }

  changeQty(qty: number): void {
    this.ui.qty = qty;
  }

  order(): void {
    if (this.view.item && this.view.item.id) {
      this.user.addItem({ id: this.view.item.id, qty: this.ui.qty });
    }
  }
}

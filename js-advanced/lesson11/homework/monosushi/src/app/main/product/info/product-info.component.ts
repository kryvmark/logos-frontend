import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class ProductInfoComponent implements OnInit, OnDestroy {
  public ui = {
    qty: 1,
    categories: conf.categories,
    parseInt: (s: string) => parseInt(s),
    firebase: (name: string) => this.market.image('items', name),
  };

  public view!: MarketProductItem;
  public rolls: MarketItem[] = [];
  public similar: MarketItem[] = [];

  public interval!: NodeJS.Timeout;

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

          let promo = () => {
            this.rolls = this._shuffle(
              this.market.records.items.filter(
                (record) =>
                  record.product == 'rolls' &&
                  record.id &&
                  item.id &&
                  record.id != item.id
              )
            ).slice(0, 4);

            this.similar = this._shuffle(
              this.market.records.items.filter(
                (record) =>
                  record.product == item.product &&
                  record.id &&
                  item.id &&
                  record.id != item.id
              )
            ).slice(0, 2);
          }

          promo();
          this.interval = setInterval(promo, 30000);
        } else
          this.router.navigate([`/products/${view.path}`], {
            replaceUrl: true,
          });
      } else this.router.navigate(['/'], { replaceUrl: true });
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  changeQty(qty: number): void {
    this.ui.qty = qty;
  }

  order(): void {
    if (this.view.item && this.view.item.id) {
      this.user.addItem({ id: this.view.item.id, qty: this.ui.qty });
    }
  }

  orderSuggested(item: MarketOrderItem): void {
    const { id, qty } = item;
    this.user.addItem({ id, qty });
  }

  private _shuffle(array: any[]) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}

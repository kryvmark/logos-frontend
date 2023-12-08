import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { MarketService } from 'src/core/market/market.service';
import {
  MarketItem,
  MarketOffer,
  MarketOrderItem,
  MarketProduct,
} from 'src/core/types';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  public ui = {
    qty: 1,
    parseInt: (s: string) => parseInt(s),
    firebase: (name: string) => this.market.image('item', name),
  };

  public product!: MarketProduct;
  public item!: MarketItem;

  constructor(
    private market: MarketService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name') ?? '';

    if (name)
      this.market
        .readOne<MarketProduct>('product', name)
        .pipe(catchError(() => of(null)))
        .subscribe((product) => {
          if (product) {
            this.product = product;

            const path = this.route.snapshot.paramMap.get('path') ?? '';

            if (path)
              this.market
                .readOne<MarketItem>('item', path)
                .pipe(catchError(() => of(null)))
                .subscribe((item) => {
                  if (item) {
                    this.item = item;
                  } else {
                    this.router.navigate([`/product/${name}`], {
                      replaceUrl: true,
                    });
                  }
                });
          } else {
            this.router.navigate(['/product'], { replaceUrl: true });
          }
        });
  }

  changeQty(qty: number): void {
    this.ui.qty = qty;
  }

  order(): void {
    if (this.item.id) {
      const item: MarketOrderItem = {
        itemId: this.item.id,
        qty: this.ui.qty,
      };

      let cart = JSON.parse(localStorage.getItem('cart') || JSON.stringify([]));
      if (cart instanceof Array) {
        const found = cart.find((ordered) => ordered.itemId == item.itemId);

        if (found) found.qty += item.qty;
        else cart.push(item);
      } else cart = [];

      localStorage.setItem('cart', JSON.stringify(cart));
      this.market.cart.next();
    }
  }
}

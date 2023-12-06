import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { MarketService } from 'src/core/market/market.service';
import { MarketOffer, MarketProduct } from 'src/core/types';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  public ui = {
    firebase: (name: string) => this.market.image('product', name),
  };

  public product!: MarketProduct;

  constructor(
    private market: MarketService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('name') ?? '');

    if (id) {
      this.market
        .readOne<MarketProduct>('product', id)
        .pipe(catchError(() => of(null)))
        .subscribe((product) => {
          if (product) {
            this.product = product;
            console.log(this.product);
          } else {
            this.router.navigate(['/product'], { replaceUrl: true });
          }
        });
    }
  }
}

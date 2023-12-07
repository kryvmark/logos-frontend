import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MarketService } from 'src/core/market/market.service';
import { MarketProduct } from 'src/core/types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  public path = this.route.snapshot.paramMap.get('path')!;
  public product!: MarketProduct;
  public routing!: Subscription;

  constructor(
    private market: MarketService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routing = this.route.url.subscribe(() => {
      this.path = this.route.snapshot.paramMap.get('path')!;

      this.market.readOne<MarketProduct>('product', this.path).subscribe((product) => {
        if (product) this.product = product;
        else this.router.navigate(['/'], { replaceUrl: true });
      });
    });
  }
}

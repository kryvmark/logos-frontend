import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketService } from 'src/core/market/market.service';
import { MarketProduct } from 'src/core/types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  public path = this.route.snapshot.paramMap.get('path');
  public product!: MarketProduct;

  constructor(
    private market: MarketService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.market.read<MarketProduct>('product').subscribe((products) => {
      const product = products.find((record) => record.path == this.path);

      if (product) this.product = product;
      else this.router.navigate(['/'], { replaceUrl: true });
    });
  }
}

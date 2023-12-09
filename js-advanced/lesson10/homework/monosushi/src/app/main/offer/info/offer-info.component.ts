import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { MarketService } from 'src/core/market/market.service';
import { MarketOffer } from 'src/core/types';

@Component({
  selector: 'app-offer-info',
  templateUrl: './offer-info.component.html',
  styleUrls: ['./offer-info.component.scss'],
})
export class OfferInfoComponent implements OnInit {
  public ui = {
    firebase: (name: string) => this.market.image('offers', name),
  };

  public offer!: MarketOffer;

  constructor(
    private market: MarketService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id') ?? '');

    if (id) {
      // this.market
      //   .readOne<MarketOffer>('offer', id)
      //   .pipe(catchError(() => of(null)))
      //   .subscribe((offer) => {
      //     if (offer) this.offer = offer;
      //     else this.router.navigate(['/offer'], { replaceUrl: true });
      //   });
    }
  }
}

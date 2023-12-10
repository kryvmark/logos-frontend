import { Component, OnInit } from '@angular/core';
import { MarketService } from 'src/core/market/market.service';
import { MarketOffer } from 'src/core/types';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  public offers: MarketOffer[] = [];

  public ui = {
    firebase: (name: string) => this.market.image('offers', name),
  };

  constructor(private market: MarketService) {}

  ngOnInit(): void {
    if (!this.market.records) {
      this.market.read().subscribe(() => {
        this.offers = this.market.records.offers;
      });
    } else {
      this.offers = this.market.records.offers;
    }
  }
}

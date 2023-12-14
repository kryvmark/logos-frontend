import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private market: MarketService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      if (data['response']) this.offers = data['response'].offers as MarketOffer[];
    });
  }
}

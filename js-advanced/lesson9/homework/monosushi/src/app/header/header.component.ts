import { Component, HostListener } from '@angular/core';
import { MarketService } from 'src/core/market/market.service';
import { MarketProduct } from 'src/core/types';
import { conf } from '../../core/conf';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public ui = {
    menu: false,
    mobile: true,

    toggle: (state?: boolean) => {
      this.ui.menu = state ?? !this.ui.menu;
      this.onResize();
      return this.ui.menu;
    },

    logo: (name: string) => this.market.image('product', name),

    conf: {
      workFrom: conf.workFrom,
      workTo: conf.workTo,
      workDay: conf.workDay,
    },
  };

  public products: MarketProduct[] = [];

  constructor(private market: MarketService) {
    this.onResize();
    market.read<MarketProduct>('product').subscribe((data) => {
      this.products = data;
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.ui.mobile = window.innerWidth < 1200;

    if (this.ui.mobile) {
      this.ui.menu
        ? window.document.body.classList.add('locked')
        : window.document.body.classList.remove('locked');
    }
  }
}

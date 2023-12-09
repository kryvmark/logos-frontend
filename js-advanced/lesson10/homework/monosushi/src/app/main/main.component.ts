import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { conf } from 'src/core/conf';
import { MarketService } from 'src/core/market/market.service';
import {
  MarketItem,
  MarketItemCategory,
  MarketOffer,
  MarketOrderItem,
} from 'src/core/types';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { Autoplay, Pagination } from 'swiper/modules';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {
  public offers: MarketOffer[] = [];
  public items: MarketItem[] = [];
  public orderItems: MarketOrderItem[] = [];

  public ui = {
    spoiler: false,
    mobile: window.innerWidth < 768,

    category: '',
    categoryChange: (category: MarketItemCategory | '') => {
      this.ui.category = category;
    },

    toggle: () => {
      this.ui.spoiler = !this.ui.spoiler;
    },

    firebase: (name: string) => this.market.image('offers', name),

    conf: {
      workFrom: conf.workFrom,
      workTo: conf.workTo,
      workDay: conf.workDay,
      maxDeliveryTime: conf.maxDeliveryTime,
    },
  };

  @ViewChild('swiper')
  public swiper!: ElementRef<SwiperContainer>;

  constructor(private market: MarketService) {}

  ngOnInit(): void {
    if (!this.market.records) {
      this.market.read().subscribe(() => {
        this.offers = this.market.records.offers;
        this.items = this.market.records.items;
      });
    }
  }

  ngAfterViewInit(): void {
    const options: SwiperOptions = {
      modules: [Autoplay, Pagination],
      speed: 1000,
      slidesPerView: this.ui.mobile ? 1 : 2,
      pagination: {
        clickable: true,
      },
      autoplay: true,
    };

    Object.assign(this.swiper.nativeElement, options);
    this.swiper.nativeElement.initialize();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.ui.mobile = window.innerWidth < 768;
    this.swiper.nativeElement.slidesPerView = this.ui.mobile ? 1 : 2;
  }

  order(item: MarketOrderItem): void {
    let cart = JSON.parse(localStorage.getItem('cart') || JSON.stringify([]));
    if (cart instanceof Array) {
      const found = cart.find((ordered) => ordered.itemId == item.id);

      if (found) found.qty += item.qty;
      else cart.push(item);
    } else cart = [];

    localStorage.setItem('cart', JSON.stringify(cart));
    this.market.subject.next();
  }
}

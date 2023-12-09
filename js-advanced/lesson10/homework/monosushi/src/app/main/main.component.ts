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
import { ActivatedRoute } from '@angular/router';

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
    mobile: window.innerWidth < 768,
    spoiler: false,
    toggle: () => {
      this.ui.spoiler = !this.ui.spoiler;
    },

    category: '',
    categories: conf.categories,
    categoryChange: (category: MarketItemCategory | '') => {
      this.ui.category = category;
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

  constructor(private market: MarketService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      if (data['response']) {
        this.offers = data['response'].offers as MarketOffer[];
        this.items = data['response'].items as MarketItem[];
      }
    });
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
}

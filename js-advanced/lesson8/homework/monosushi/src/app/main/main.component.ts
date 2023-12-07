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
import { MarketOffer } from 'src/core/types';
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

  public ui = {
    spoiler: false,
    mobile: window.innerWidth < 768,

    toggle: () => {
      this.ui.spoiler = !this.ui.spoiler;
    },

    firebase: (name: string) => this.market.image('offer', name),

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
    this.market.read<MarketOffer>('offer').subscribe((offers) => {
      this.offers = offers;
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

import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MarketService } from 'src/core/market/market.service';
import {
  MarketItem,
  MarketOffer,
  MarketOrder,
  MarketPath,
  MarketProduct,
} from 'src/core/types';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public path!: MarketPath;
  public routing!: Subscription;
  public form!: FormGroup;

  public records = {
    offer: new Array<MarketOffer>(),
    product: new Array<MarketProduct>(),
    item: new Array<MarketItem>(),
    order: new Array<MarketOrder>(),
  };

  public ui = {
    mobile: window.innerWidth < 1200,

    form: false,
    formIndex: -1,
    formImage: '',
    formFile: new File([], ''),

    formToggle: (state?: boolean) => {
      this.ui.form = state ?? !this.ui.form;

      if (!this.ui.form && this.form) {
        this.form.reset();
        this.ui.formIndex = -1;
        this.ui.formImage = '';
        this.ui.formFile = new File([], '');
      }

      return this.ui.form;
    },

    formUpload: (target: EventTarget | null) => {
      if (target) {
        const input = target as HTMLInputElement;

        if (input && input.files) {
          this.ui.formFile = input.files[0];
          this.ui.formImage = URL.createObjectURL(this.ui.formFile);
        }
      }
    },

    firebase: (name: string) => this.market.image(this.path, name),

    create: () => {
      switch (this.path) {
        case 'offer':
          const offerFileExt = this.ui.formFile.name.split('.').pop();
          const offerFileDate = Date.now();
          const offerFileName = `${offerFileDate}.${offerFileExt}`;

          const offer: MarketOffer = {
            date: offerFileDate,
            name: this.form.controls['name'].value,
            title: this.form.controls['title'].value,
            terms: this.form.controls['terms'].value.toString().split('\n'),
            logo: offerFileName,
          };

          if (offer.logo) {
            this.market
              .upload('offer', offerFileName, this.ui.formFile)
              .finally(() => {
                this.market.create('offer', offer).subscribe(() => {
                  this.ui.read();
                });
              });
          }

          break;
        case 'product':
          const productFileExt = this.ui.formFile.name.split('.').pop();
          const productFileDate = Date.now();
          const productFileName = `${productFileDate}.${productFileExt}`;

          const product: MarketProduct = {
            name: this.form.controls['name'].value,
            path: this.form.controls['path'].value,
            logo: productFileName,
          };

          if (product.logo) {
            this.market
              .upload('product', productFileName, this.ui.formFile)
              .finally(() => {
                this.market.create('product', product).subscribe(() => {
                  this.ui.read();
                });
              });
          }

          break;
      }
    },

    read: () => {
      this.ui.formToggle(false);

      switch (this.path) {
        case 'offer':
          this.market.read<MarketOffer>(this.path).subscribe((records) => {
            this.records.offer = records;
          });
          break;
        case 'product':
          this.market.read<MarketProduct>(this.path).subscribe((records) => {
            this.records.product = records;
          });
          break;
        case 'item':
          this.market.read<MarketItem>(this.path).subscribe((records) => {
            this.records.item = records;
          });
          break;
        case 'order':
          this.market.read<MarketOrder>(this.path).subscribe((records) => {
            this.records.order = records;
          });
          break;
      }
    },

    readOne: (i: number) => {
      this.ui.formToggle();
      this.ui.formIndex = i;

      switch (this.path) {
        case 'offer':
          const offer = this.records.offer[i];

          this.form.patchValue({
            name: offer.name,
            title: offer.title,
            terms: offer.terms.join('\n'),
          });

          this.ui.formImage = this.ui.firebase(offer.logo);

          break;
        case 'product':
          const product = this.records.product[i];

          this.form.patchValue({
            name: product.name,
            path: product.path,
          });

          this.ui.formImage = this.ui.firebase(product.logo);

          break;
      }
    },

    update: () => {
      switch (this.path) {
        case 'offer':
          const offer = { ...this.records.offer[this.ui.formIndex] };
          offer.name = this.form.controls['name'].value;
          offer.title = this.form.controls['title'].value;

          offer.terms = this.form.controls['terms'].value
            .toString()
            .split('\n');

          if (this.ui.formFile.name) {
            this.market.erase('offer', offer.logo).finally(() => {
              const offerFileExt = this.ui.formFile.name.split('.').pop();
              const offerFileDate = Date.now();
              offer.logo = `${offerFileDate}.${offerFileExt}`;

              this.market
                .upload('offer', offer.logo, this.ui.formFile)
                .finally(() => {
                  this.market.update('offer', offer).subscribe(() => {
                    this.ui.read();
                  });
                });
            });
          } else
            this.market.update('offer', offer).subscribe(() => {
              this.ui.read();
            });

          break;
        case 'product':
          const product = { ...this.records.product[this.ui.formIndex] };
          product.name = this.form.controls['name'].value;
          product.path = this.form.controls['path'].value;

          if (this.ui.formFile.name) {
            this.market.erase('product', product.logo).finally(() => {
              const productFileExt = this.ui.formFile.name.split('.').pop();
              const productFileDate = Date.now();
              product.logo = `${productFileDate}.${productFileExt}`;

              this.market
                .upload('product', product.logo, this.ui.formFile)
                .finally(() => {
                  this.market.update('product', product).subscribe(() => {
                    this.ui.read();
                  });
                });
            });
          } else
            this.market.update('product', product).subscribe(() => {
              this.ui.read();
            });

          break;
      }
    },

    delete: (i: number) => {
      switch (this.path) {
        case 'offer':
          const offer = this.records.offer[i];
          const offerId = offer.id;

          if (offerId) {
            this.market.erase('offer', offer.logo).finally(() => {
              this.market
                .delete<MarketOffer>('offer', offerId)
                .subscribe(() => {
                  this.ui.read();
                });
            });
          }

          break;
        case 'product':
          const product = this.records.product[i];
          const productId = product.id;

          if (productId) {
            this.market.erase('product', product.logo).finally(() => {
              this.market
                .delete<MarketProduct>('product', productId)
                .subscribe(() => {
                  this.ui.read();
                });
            });
          }

          break;
      }
    },
  };

  constructor(
    private route: ActivatedRoute,
    private market: MarketService,
    private forms: FormBuilder
  ) {}

  ngOnInit(): void {
    this.routing = this.route.url.subscribe(([url]) => {
      this.path = url.path as MarketPath;
      this.ui.read();

      switch (this.path) {
        case 'offer':
          this.form = this.forms.group({
            name: ['', Validators.required],
            title: ['', Validators.required],
            terms: ['', Validators.required],
            image: [null],
          });

          break;
        case 'product':
          this.form = this.forms.group({
            name: ['', Validators.required],
            path: ['', Validators.required],
            image: [null],
          });

          break;
      }
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.ui.mobile = window.innerWidth < 1200;
  }
}

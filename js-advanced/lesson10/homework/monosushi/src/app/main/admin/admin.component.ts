import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MarketService } from 'src/core/market/market.service';
import {
  MarketPath,
  MarketItem,
  MarketOffer,
  MarketOrder,
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
        if (this.form.controls['product'])
          this.form.controls['product'].setValue('');
        if (this.form.controls['subcat'])
          this.form.controls['subcat'].setValue('');
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
        case 'item':
          const itemFileExt = this.ui.formFile.name.split('.').pop();
          const itemFileDate = Date.now();
          const itemFileName = `${itemFileDate}.${itemFileExt}`;

          const item: MarketItem = {
            product: this.form.controls['product'].value,
            subcat: this.form.controls['subcat'].value,
            name: this.form.controls['name'].value,
            path: this.form.controls['path'].value,
            comp: this.form.controls['comp'].value,
            weight: this.form.controls['weight'].value,
            price: this.form.controls['price'].value,
            logo: itemFileName,
          };

          if (item.logo) {
            this.market
              .upload('item', itemFileName, this.ui.formFile)
              .finally(() => {
                this.market.create('item', item).subscribe(() => {
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
          this.market.read<MarketOffer>('offer').subscribe((records) => {
            this.records.offer = records;
          });
          break;
        case 'product':
          this.market.read<MarketProduct>('product').subscribe((records) => {
            this.records.product = records;
          });
          break;
        case 'item':
          this.market.read<MarketItem>('item').subscribe((records) => {
            this.records.item = records;
          });

          this.market.read<MarketProduct>('product').subscribe((records) => {
            this.records.product = records;
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
        case 'item':
          const item = this.records.item[i];

          this.form.patchValue({
            product: item.product,
            subcat: item.subcat,
            path: item.path,
            name: item.name,
            comp: item.comp,
            weight: item.weight,
            price: item.price,
          });

          this.ui.formImage = this.ui.firebase(item.logo);

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
        case 'item':
          const item = { ...this.records.item[this.ui.formIndex] };
          item.product = this.form.controls['product'].value;
          item.subcat = this.form.controls['subcat'].value;
          item.name = this.form.controls['name'].value;
          item.path = this.form.controls['path'].value;
          item.comp = this.form.controls['comp'].value;
          item.weight = this.form.controls['weight'].value;
          item.price = this.form.controls['price'].value;

          if (this.ui.formFile.name) {
            this.market.erase('item', item.logo).finally(() => {
              const itemFileExt = this.ui.formFile.name.split('.').pop();
              const itemFileDate = Date.now();
              item.logo = `${itemFileDate}.${itemFileExt}`;

              this.market
                .upload('item', item.logo, this.ui.formFile)
                .finally(() => {
                  this.market.update('item', item).subscribe(() => {
                    this.ui.read();
                  });
                });
            });
          } else
            this.market.update('item', item).subscribe(() => {
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
        case 'item':
          const item = this.records.item[i];
          const itemId = item.id;

          if (itemId) {
            this.market.erase('item', item.logo).finally(() => {
              this.market.delete<MarketItem>('item', itemId).subscribe(() => {
                this.ui.read();
              });
            });
          }

          break;
      }
    },

    misc: {
      itemProductName: (i: number) => {
        const item = this.records.item[i];

        if (item) {
          const product = this.records.product.find(
            (record) => record.path == item.product
          );

          if (product) return product.name;
        }
        return 'Невідомо';
      },

      itemSubcatDict: {
        'roll-philadelphia': 'Роли Філадельфія',
        'roll-california': 'Роли Каліфорнія',
        'roll-baked': 'Запечені Роли',
        'sushi-craft': 'Фірмові Суші',
        'roll-maki': 'Роли Макі',
        'sushi-premium': 'Преміум Суші',
      },

      itemSubcat: () => {
        const object: any = { ...this.ui.misc.itemSubcatDict };
        const subcat = [];

        for (const key in object) {
          if (Object.prototype.hasOwnProperty.call(object, key)) {
            subcat.push({
              name: key,
              title: object[key],
            });
          }
        }
        return subcat;
      },
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
        case 'item':
          this.form = this.forms.group({
            product: ['', Validators.required],
            subcat: [''],
            name: ['', Validators.required],
            path: ['', Validators.required],
            comp: [''],
            weight: ['', Validators.required],
            price: ['', Validators.required],
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

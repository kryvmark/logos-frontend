import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/core/admin/admin.service';
import { conf } from 'src/core/conf';
import { MarketService } from 'src/core/market/market.service';
import {
  MarketItem,
  MarketOffer,
  MarketProduct,
  MarketPath,
  AdminPath,
  Market,
  MarketOrder,
} from 'src/core/types';
import { UserService } from 'src/core/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public path!: AdminPath;
  public routing!: Subscription;
  public form!: FormGroup;

  public records: Market = {
    offers: new Array<MarketOffer>(),
    products: new Array<MarketProduct>(),
    items: new Array<MarketItem>(),
  };

  public orders: MarketOrder[] = [];

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
        if (this.form.controls['category'])
          this.form.controls['category'].setValue('');
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

    firebase: (path: MarketPath, name: string) => this.market.image(path, name),

    create: () => {
      switch (this.path) {
        case 'offers':
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
            this.admin
              .upload('offers', offerFileName, this.ui.formFile)
              .finally(() => {
                this.admin.create('offers', offer).subscribe(() => {
                  this.ui.read();
                });
              });
          }

          break;
        case 'products':
          const productFileExt = this.ui.formFile.name.split('.').pop();
          const productFileDate = Date.now();
          const productFileName = `${productFileDate}.${productFileExt}`;

          const product: MarketProduct = {
            name: this.form.controls['name'].value,
            path: this.form.controls['path'].value,
            logo: productFileName,
          };

          if (product.logo) {
            this.admin
              .upload('products', productFileName, this.ui.formFile)
              .finally(() => {
                this.admin.create('products', product).subscribe(() => {
                  this.ui.read();
                });
              });
          }

          break;
        case 'items':
          const itemFileExt = this.ui.formFile.name.split('.').pop();
          const itemFileDate = Date.now();
          const itemFileName = `${itemFileDate}.${itemFileExt}`;

          const item: MarketItem = {
            product: this.form.controls['product'].value,
            category: this.form.controls['category'].value,
            name: this.form.controls['name'].value,
            path: this.form.controls['path'].value,
            comp: this.form.controls['comp'].value,
            weight: this.form.controls['weight'].value,
            price: this.form.controls['price'].value,
            logo: itemFileName,
          };

          if (item.logo) {
            this.admin
              .upload('items', itemFileName, this.ui.formFile)
              .finally(() => {
                this.admin.create('items', item).subscribe(() => {
                  this.ui.read();
                });
              });
          }

          break;
      }
    },

    read: (update = true) => {
      this.ui.formToggle(false);

      if (this.path != 'orders') {
        this.route.data.subscribe((data) => {
          if (data['response']) this.records = data['response'] as Market;
        });

        if (update) {
          this.market.read().subscribe(() => {
            const { offers, products, items } = this.market.records;
            this.records = { offers, products, items };
          });
        }
      } else {
        this.route.data.subscribe((data) => {
          if (data['response']) this.orders = data['response'] as MarketOrder[];
        });

        if (update) {
          this.admin.readOrders().then(() => {
            this.orders = this.admin.orders;
          });
        }
      }
    },

    readOne: (i: number) => {
      this.ui.formToggle();
      this.ui.formIndex = i;

      switch (this.path) {
        case 'offers':
          const offer = this.records.offers[i];

          this.form.patchValue({
            name: offer.name,
            title: offer.title,
            terms: offer.terms.join('\n'),
          });

          this.ui.formImage = this.ui.firebase('offers', offer.logo);

          break;
        case 'products':
          const product = this.records.products[i];

          this.form.patchValue({
            name: product.name,
            path: product.path,
          });

          this.ui.formImage = this.ui.firebase('products', product.logo);

          break;
        case 'items':
          const item = this.records.items[i];

          this.form.patchValue({
            product: item.product,
            category: item.category,
            path: item.path,
            name: item.name,
            comp: item.comp,
            weight: item.weight,
            price: item.price,
          });

          this.ui.formImage = this.ui.firebase('items', item.logo);

          break;
      }
    },

    update: () => {
      switch (this.path) {
        case 'offers':
          const offer = { ...this.records.offers[this.ui.formIndex] };
          offer.name = this.form.controls['name'].value;
          offer.title = this.form.controls['title'].value;

          offer.terms = this.form.controls['terms'].value
            .toString()
            .split('\n');

          if (this.ui.formFile.name) {
            this.admin.erase('offers', offer.logo).finally(() => {
              const offerFileExt = this.ui.formFile.name.split('.').pop();
              const offerFileDate = Date.now();
              offer.logo = `${offerFileDate}.${offerFileExt}`;

              this.admin
                .upload('offers', offer.logo, this.ui.formFile)
                .finally(() => {
                  this.admin.update('offers', offer).subscribe(() => {
                    this.ui.read();
                  });
                });
            });
          } else
            this.admin.update('offers', offer).subscribe(() => {
              this.ui.read();
            });

          break;
        case 'products':
          const product = { ...this.records.products[this.ui.formIndex] };
          product.name = this.form.controls['name'].value;
          product.path = this.form.controls['path'].value;

          if (this.ui.formFile.name) {
            this.admin.erase('products', product.logo).finally(() => {
              const productFileExt = this.ui.formFile.name.split('.').pop();
              const productFileDate = Date.now();
              product.logo = `${productFileDate}.${productFileExt}`;

              this.admin
                .upload('products', product.logo, this.ui.formFile)
                .finally(() => {
                  this.admin.update('products', product).subscribe(() => {
                    this.ui.read();
                  });
                });
            });
          } else
            this.admin.update('products', product).subscribe(() => {
              this.ui.read();
            });

          break;
        case 'items':
          const item = { ...this.records.items[this.ui.formIndex] };
          item.product = this.form.controls['product'].value;
          item.category = this.form.controls['category'].value;
          item.name = this.form.controls['name'].value;
          item.path = this.form.controls['path'].value;
          item.comp = this.form.controls['comp'].value;
          item.weight = this.form.controls['weight'].value;
          item.price = this.form.controls['price'].value;

          if (this.ui.formFile.name) {
            this.admin.erase('items', item.logo).finally(() => {
              const itemFileExt = this.ui.formFile.name.split('.').pop();
              const itemFileDate = Date.now();
              item.logo = `${itemFileDate}.${itemFileExt}`;

              this.admin
                .upload('items', item.logo, this.ui.formFile)
                .finally(() => {
                  this.admin.update('items', item).subscribe(() => {
                    this.ui.read();
                  });
                });
            });
          } else
            this.admin.update('items', item).subscribe(() => {
              this.ui.read();
            });

          break;
      }
    },

    confirm: (i: number) => {
      if (this.path == 'orders') {
        this.admin.confirmOrder(i).then(() => {
          this.ui.read();
        })
      }
    },

    delete: (i: number) => {
      switch (this.path) {
        case 'offers':
          const offer = this.records.offers[i];
          const offerId = offer.id;

          if (offerId) {
            this.admin.erase('offers', offer.logo).finally(() => {
              this.admin.delete('offers', offerId).subscribe(() => {
                this.ui.read();
              });
            });
          }

          break;
        case 'products':
          const product = this.records.products[i];
          const productId = product.id;

          if (productId) {
            this.admin.erase('products', product.logo).finally(() => {
              this.admin.delete('products', productId).subscribe(() => {
                this.ui.read();
              });
            });
          }

          break;
        case 'items':
          const item = this.records.items[i];
          const itemId = item.id;

          if (itemId) {
            this.admin.erase('items', item.logo).finally(() => {
              this.admin.delete('items', itemId).subscribe(() => {
                this.ui.read();
              });
            });
          }

          break;
      }
    },

    misc: {
      itemProductName: (i: number) => {
        const item = this.records.items[i];

        if (item) {
          const product = this.records.products.find(
            (record) => record.path == item.product
          );

          if (product) return product.name;
        }
        return 'Невідомо';
      },

      categories: conf.categories,
      itemCategories: () => {
        const object: any = { ...this.ui.misc.categories };
        const category = [];

        for (const key in object) {
          if (Object.prototype.hasOwnProperty.call(object, key)) {
            category.push({
              name: key,
              title: object[key],
            });
          }
        }
        return category;
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private market: MarketService,
    private user: UserService,
    private admin: AdminService,
    private forms: FormBuilder
  ) {}

  ngOnInit(): void {
    this.routing = this.route.url.subscribe(([url]) => {
      this.path = url.path as AdminPath;
      this.ui.read(false);

      switch (this.path) {
        case 'offers':
          this.form = this.forms.group({
            name: ['', Validators.required],
            title: ['', Validators.required],
            terms: ['', Validators.required],
            image: [null],
          });

          break;
        case 'products':
          this.form = this.forms.group({
            name: ['', Validators.required],
            path: ['', Validators.required],
            image: [null],
          });

          break;
        case 'items':
          this.form = this.forms.group({
            product: ['', Validators.required],
            category: [''],
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

  logout() {
    this.user.logout().then(() => {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    });
  }
}

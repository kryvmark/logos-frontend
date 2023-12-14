import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { conf } from 'src/core/conf';
import { MarketService } from 'src/core/market/market.service';
import { MarketCart, MarketItem, MarketOrder } from 'src/core/types';
import { UserService } from 'src/core/user/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public cart!: MarketCart;
  public items: MarketItem[] = [];
  public subject!: Subscription;

  public form!: FormGroup;

  public ui = {
    selfPickup: false,
    setSelfPickup: (value: boolean) => {
      this.ui.selfPickup = value;
    },
    addresses: new Array<string>(),
    deliveryPoints: conf.deliveryPoints,
    firebase: (name: string) => this.market.image('items', name),
  };

  constructor(
    private market: MarketService,
    private user: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private forms: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      if (data['response']) {
        this.items = data['response'].items as MarketItem[];
        this.subject = this.user.subject.subscribe(() => {
          this.cart = this.user.getCart(this.items);
        });
        this.user.subject.next();

        if (this.user.addresses) this.ui.addresses = this.user.addresses;

        this.form = this.forms.group({
          utensilsRegular: [1, Validators.required],
          utensilsTrial: [0],
          cash: [true, Validators.required],
          selfPickup: [false, Validators.required],
          firstName: [
            { value: this.user.firstName, disabled: true },
            Validators.required,
          ],
          phone: [
            { value: `+38${this.user.phone}`, disabled: true },
            Validators.required,
          ],
          address: ['', Validators.required],
          call: [false],
        });
      }
    });
  }

  checkout(): void {
    if (this.user.id && this.user.firstName && this.user.phone) {
      const order: MarketOrder = {
        date: Date.now(),
        firstName: this.user.firstName,
        phone: `+38${this.user.phone}`,
        utensils: {
          regular: this.form.controls['utensilsRegular'].value,
          trial: this.form.controls['utensilsTrial'].value,
        },
        cash: this.form.controls['cash'].value,
        selfPickup: this.form.controls['selfPickup'].value,
        address: this.form.controls['address'].value,
        call: this.form.controls['call'].value,
        items: this.user.cart.items,
        complete: false,
        total: this.cart.total.price,
      };

      this.user.checkout(order).then(() => {
        this.user.subject.next();
        this.router.navigateByUrl('/profile/history');
      });
    }
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }

  changeQty(i: number, qty: number) {
    this.user.changeQty(i, qty);
    this.user.subject.next();
  }

  remove(i: number) {
    this.user.removeItem(i);
    this.user.subject.next();
  }
}

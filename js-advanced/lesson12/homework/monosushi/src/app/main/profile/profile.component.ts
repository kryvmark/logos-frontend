import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MarketOrder, UserPath } from 'src/core/types';
import { UserService } from 'src/core/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public path!: UserPath;
  public routing!: Subscription;
  public form!: FormGroup;

  public orders: MarketOrder[] = [];

  public ui = {
    mobile: window.innerWidth < 1200,
    createAddress: () => {
      const length = this.addresses.controls.length - 1;
      const lastControl = this.addresses.controls[length];
      if (length <= 0 || (lastControl && lastControl.value.address)) {
        this.addresses.push(
          this.forms.group({
            address: ['', Validators.required],
          })
        );
      }
    },
    readAddresses: () => {
      this.user.checkLogin().then(() => {
        if (this.user.addresses) {
          this.addresses.clear();
          this.user.addresses.forEach((address, i) => {
            this.addresses.push(
              this.forms.group({
                address: ['', Validators.required],
              })
            );
            this.addresses.at(i).patchValue({ address: address });
          });
        }
      });
    },
    updateAddress: (i: number) => {
      const control = this.addresses.controls.at(i);
      if (control) {
        this.user.updateAddress(i, control.value.address).then(() => {
          this.ui.readAddresses();
        });
      }
    },
    deleteAddress: (i: number) => {
      this.user.deleteAddress(i).then(() => {
        this.addresses.removeAt(i);
      });
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private user: UserService,
    private forms: FormBuilder
  ) {}

  ngOnInit(): void {
    this.routing = this.route.url.subscribe(([url]) => {
      this.path = url.path as UserPath;

      switch (this.path) {
        case 'main':
          this.form = this.forms.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
            email: [
              { value: this.user.email, disabled: true },
              [Validators.required, Validators.email],
            ],
            addresses: this.forms.array<string>([]),
          });

          this.form.patchValue({
            firstName: this.user.firstName || '',
            lastName: this.user.lastName || '',
            phone: this.user.phone || '',
          });

          this.ui.readAddresses();

          break;
        case 'history':
          this.route.data.subscribe((data) => {
            if (data['response']) {
              this.orders = data['response'] as MarketOrder[];
            }
          });
          break;
      }
    });
  }

  get addresses(): FormArray {
    return this.form.controls['addresses'] as FormArray;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.ui.mobile = window.innerWidth < 1200;
  }

  save(): void {
    const data = {
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      phone: this.form.controls['phone'].value,
    };
    this.user.update(data);
  }

  repeatOrder(i: number): void {
    this.user.repeatOrder(i).then(() => {
      this.user.checkLogin().then(() => {
        if (this.user.orders) this.orders = this.user.orders;
      });
    });
  }

  logout(): void {
    this.user.logout().then(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }
}

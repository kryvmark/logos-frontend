import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/core/types';
import { UserService } from 'src/core/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UsersComponent {
  public error = false;
  public form!: FormGroup;

  public ui = {
    obscure: true,
    register: false,
    registerToggle: () => {
      this.ui.register = !this.ui.register;
      this.ui.onRegisterToggle();
    },
    onRegisterToggle: () => {
      this.ui.obscure = true;

      if (this.ui.register) {
        this.form = this.forms.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
          email: ['', [Validators.required, Validators.email]],
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(16),
            ],
          ],
          passwordAux: [
            '',
            [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(16),
            ],
          ],
          agreement: [false, Validators.requiredTrue],
        });
      } else {
        this.form = this.forms.group({
          email: ['', [Validators.required, Validators.email]],
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(16),
            ],
          ],
        });
      }
    },
  };

  constructor(
    private dialog: MatDialogRef<UsersComponent>,
    private service: UserService,
    private forms: FormBuilder,
    private toastr: ToastrService
  ) {
    this.ui.onRegisterToggle();
  }

  unError(): void {
    this.error = false;
  }

  login(): void {
    const email = this.form.controls['email'].value;
    const password = this.form.controls['password'].value;
    this.service.login(email, password).then((success) => {
      if (success) {
        if (!this.service.admin) {
          this.close();
          this.toastr.success(
            `Вітаємо, ${this.service.firstName ?? 'Користувач'}!`
          );
        } else {
          this.service.logout();
          this.error = true;
        }
      } else this.error = true;
    });
  }

  register(): void {
    const firstName = this.form.controls['firstName'].value;
    const lastName = this.form.controls['lastName'].value;
    const phone = this.form.controls['phone'].value;
    const email = this.form.controls['email'].value;
    const password = this.form.controls['password'].value;
    const passwordAux = this.form.controls['passwordAux'].value;

    if (password && password == passwordAux) {
      const user: User = {
        firstName,
        lastName,
        phone,
        email,
        addresses: [],
      };

      this.service.register(user, password).then(() => {
        this.ui.registerToggle();
        this.form.patchValue({ email, password });
      });
    }
  }

  close(): void {
    this.dialog.close();
  }
}

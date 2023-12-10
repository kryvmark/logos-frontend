import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/core/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public error = false;
  public form!: FormGroup;

  constructor(
    private service: UserService,
    private forms: FormBuilder,
    private router: Router
  ) {
    this.form = forms.group({
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

  unError(): void {
    this.error = false;
  }

  login(): void {
    const email = this.form.controls['email'].value;
    const password = btoa(this.form.controls['password'].value);

    this.service.login(email, password).subscribe((success) => {
      if (success) {
        if (this.service.admin) this.router.navigate(['/admin']);
        else this.router.navigate(['/profile']);
      }
      else this.error = true;
    });
  }
}

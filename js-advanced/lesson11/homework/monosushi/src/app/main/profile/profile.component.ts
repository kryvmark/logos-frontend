import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserPath } from 'src/core/types';
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

  public ui = {
    mobile: window.innerWidth < 1200,
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
            email: ['', [Validators.required, Validators.email]],
          });
          this.getInfo();

          break;
      }
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.ui.mobile = window.innerWidth < 1200;
  }

  getInfo(): void {
    this.form.patchValue({
      firstName: this.user.firstName || '',
      lastName: this.user.lastName || '',
      email: this.user.email || '',
    })
  }

  logout() {
    this.router.navigateByUrl('/login', { replaceUrl: true });
    this.user.logout();
  }
}

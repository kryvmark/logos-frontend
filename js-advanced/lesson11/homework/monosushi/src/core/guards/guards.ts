import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from '../user/user.service';

export const loginGuard: CanActivateFn = () => {
  const service = inject(UserService);
  const router = inject(Router);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.email && user.password) {
    return service.login(user.email, user.password).pipe(
      map((success) => {
        if (success) {
          if (service.admin)
            router.navigateByUrl('/admin', { replaceUrl: true });
          else router.navigateByUrl('/profile', { replaceUrl: true });
          return false;
        } else {
          localStorage.removeItem('user');
          return true;
        }
      })
    );
  }
  return true;
};

export const profileGuard: CanActivateFn = () => {
  const service = inject(UserService);
  const router = inject(Router);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.email && user.password) {
    return service.login(user.email, user.password).pipe(
      map((success) => {
        if (success) {
          if (service.admin) {
            router.navigateByUrl('/admin', { replaceUrl: true });
            return false;
          } else return true;
        } else {
          router.navigateByUrl('/login', { replaceUrl: true });
          return false;
        }
      })
    );
  } else {
    router.navigateByUrl('/login', { replaceUrl: true });
    return false;
  }
};

export const adminGuard: CanActivateChildFn = () => {
  const service = inject(UserService);
  const router = inject(Router);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.email && user.password) {
    return service.login(user.email, user.password).pipe(
      map((success) => {
        if (success) {
          if (service.admin) return true;
          else {
            router.navigateByUrl('/profile', { replaceUrl: true });
            return false;
          }
        } else {
          router.navigateByUrl('/login', { replaceUrl: true });
          return false;
        }
      })
    );
  } else {
    router.navigateByUrl('/login', { replaceUrl: true });
    return false;
  }
};

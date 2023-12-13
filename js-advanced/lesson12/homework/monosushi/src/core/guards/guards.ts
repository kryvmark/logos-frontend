import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { UserService } from '../user/user.service';

export const loginGuard: CanActivateFn = async () => {
  const service = inject(UserService);
  const router = inject(Router);

  const success = await service.checkLogin();
  if (success) {
    if (service.admin) {
      router.navigateByUrl('/admin/offer', { replaceUrl: true });
      return false;
    } else {
      router.navigateByUrl('/profile/main', { replaceUrl: true });
      return false;
    }
  }
  return true;
};

export const profileGuard: CanActivateChildFn = async () => {
  const service = inject(UserService);
  const router = inject(Router);

  const success = await service.checkLogin();
  if (success) {
    if (service.admin) {
      router.navigateByUrl('/admin/offer', { replaceUrl: true });
      return false;
    }
    return true;
  } else {
    router.navigateByUrl('/', { replaceUrl: true });
    return false;
  }
};

export const adminGuard: CanActivateChildFn = async () => {
  const service = inject(UserService);
  const router = inject(Router);

  const success = await service.checkLogin();
  if (success) {
    if (service.admin) return true;
    else {
      router.navigateByUrl('/', { replaceUrl: true });
      return false;
    }
  } else {
    router.navigateByUrl('/login', { replaceUrl: true });
    return false;
  }
};

export const checkoutGuard: CanActivateFn = async () => {
  const service = inject(UserService);
  const router = inject(Router);

  const success = await service.checkLogin();
  if (success) {
    if (service.admin) {
      router.navigateByUrl('/admin/offer', { replaceUrl: true });
      return false;
    }
    return true;
  } else {
    router.navigateByUrl('/', { replaceUrl: true });
    return false;
  }
};

import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
const authService = inject(AuthService);
const router = inject(Router);
const platformId = inject(PLATFORM_ID); 

   if (isPlatformBrowser(platformId)) {
    if (authService.isLoggedIn()) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }

  return false;
};


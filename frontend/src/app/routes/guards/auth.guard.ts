import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthStorageService } from '@app/auth/services/auth-storage.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  return inject(AuthStorageService).isAuthed$.pipe(
    tap((isAuthed: boolean) => {
      if (!isAuthed) {
        router.navigate(['/auth']);
      }
    }),
  );
};

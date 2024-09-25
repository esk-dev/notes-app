import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LinkComponent } from '../buttons/link/link.component';
import { DeviceObserverService, ObservedDevicesType } from '@ui/utils/breakpoint.service';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { IconComponent } from '@ui/icon/icon.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LINKS, UNAUTHORIZED_LINKS } from '@core/navigation/navigation.token';
import { AuthStorageService } from '@app/auth/services/auth-storage.service';
import { INavigationLink } from '@core/navigation/navigation.interface';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'notes-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    LinkComponent,
    AsyncPipe,
    MatIcon,
    MatIconButton,
    MatMenuTrigger,
    MatMenuItem,
    MatMenu,
    IconComponent,
    MatButton,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly destroyRef$ = inject(DestroyRef);
  private readonly authService: AuthService = inject(AuthService);
  private readonly authStorageService: AuthStorageService = inject(AuthStorageService);

  private readonly navLinks: INavigationLink[] = inject<INavigationLink[]>(LINKS);
  private readonly unauthorizedLinks: INavigationLink[] = inject<INavigationLink[]>(UNAUTHORIZED_LINKS);

  public readonly showMenu$: Observable<boolean> = inject(DeviceObserverService).device$.pipe(
    map((device: ObservedDevicesType) => device === 'Mobile' || device === 'Tablet'),
    distinctUntilChanged(),
    takeUntilDestroyed(this.destroyRef$),
  );

  get links$(): Observable<INavigationLink[]> {
    return this.authStorageService.isAuthed$.pipe(map((state) => (state ? this.navLinks : this.unauthorizedLinks)));
  }
  get isLoggedIn$() {
    return this.authStorageService.isAuthed$;
  }

  onLogout() {
    this.authService.logout();
  }
}

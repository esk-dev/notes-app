import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { filter, Observable } from 'rxjs';
import { MaNotification, NotificationType } from '@ui/notifiaction/notification.types';
import { NotificationService } from '@ui/notifiaction/service/notification.service';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'notes-error-notify',
  standalone: true,
  imports: [MatSnackBarLabel, MatSnackBarActions, MatButton, MatSnackBarAction, AsyncPipe, MatIcon, MatIconButton],
  templateUrl: './error-notify.component.html',
  styleUrl: './error-notify.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorNotifyComponent {
  public readonly notification$: Observable<MaNotification> = inject(NotificationService).notifyRequest$.pipe(
    filter((notify) => notify.type === NotificationType.error),
  );

  public readonly snackBarRef = inject(MatSnackBarRef);
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NotificationService } from '@ui/notifiaction/service/notification.service';
import { filter, Observable } from 'rxjs';
import { MaNotification, NotificationType } from '@ui/notifiaction/notification.types';
import { MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';
import { AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'notes-warning-notify',
  standalone: true,
  imports: [MatSnackBarLabel, AsyncPipe, MatSnackBarActions, MatSnackBarAction, MatButton, MatIcon],
  templateUrl: './warning-notify.component.html',
  styleUrl: './warning-notify.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarningNotifyComponent {
  public readonly notification$: Observable<MaNotification> = inject(NotificationService).notifyRequest$.pipe(
    filter((notify) => notify.type === NotificationType.warning),
  );

  public readonly snackBarRef = inject(MatSnackBarRef);
}

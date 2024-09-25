import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { MaNotification, NotificationType } from '@ui/notifiaction/notification.types';
import { NotificationService } from '@ui/notifiaction/service/notification.service';
import { MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'notes-success-notify',
  standalone: true,
  imports: [MatSnackBarLabel, AsyncPipe, MatSnackBarActions, MatIcon, MatButton, MatSnackBarAction, MatIconButton],
  templateUrl: './success-notify.component.html',
  styleUrl: './success-notify.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessNotifyComponent {
  public readonly notification$: Observable<MaNotification> = inject(NotificationService).notifyRequest$.pipe(
    filter((notify) => notify.type === NotificationType.success),
  );

  public readonly snackBarRef = inject(MatSnackBarRef);
}

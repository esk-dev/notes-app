import { inject, Injectable } from '@angular/core';
import { MaNotification, NotificationComponentType, NotificationType, NotifyComponentsType } from '@ui/notifiaction/notification.types';
import { ReplaySubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private durationInSeconds = 1000;
  private _snackBar = inject(MatSnackBar);
  private notifyRequest: ReplaySubject<MaNotification> = new ReplaySubject<MaNotification>(2, 100);

  notifyRequest$ = this.notifyRequest;

  constructor() {
    this.notifyRequest$.subscribe(({ type }) => this.showNotify(type));
  }

  showNotify(type: NotificationType) {
    this._snackBar.openFromComponent<NotifyComponentsType>(NotificationComponentType[type], {
      panelClass: type,
    });
  }

  success(title: string, message?: string): void {
    this.notifyRequest.next({ title, message, type: NotificationType.success });
  }

  error(title: string, message?: string): void {
    this.notifyRequest.next({ title, message, type: NotificationType.error });
  }

  warn(title: string, message?: string): void {
    this.notifyRequest.next({ title, message, type: NotificationType.warning });
  }
}

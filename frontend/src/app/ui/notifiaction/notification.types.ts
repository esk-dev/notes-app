import { SuccessNotifyComponent } from '@ui/notifiaction/components/success-notify/success-notify.component';
import { ErrorNotifyComponent } from '@ui/notifiaction/components/error-notify/error-notify.component';
import { WarningNotifyComponent } from '@ui/notifiaction/components/warning-notify/warning-notify.component';
import { ComponentType } from '@angular/cdk/overlay';

export enum NotificationType {
  success = 'is-success',
  error = 'is-error',
  warning = 'is-warning',
}

export interface MaNotification {
  title: string;
  message?: string;
  type: NotificationType;
}

export type NotifyComponentsType = SuccessNotifyComponent | ErrorNotifyComponent | WarningNotifyComponent;

export const NotificationComponentType: Record<string, ComponentType<NotifyComponentsType>> = {
  [NotificationType.success]: SuccessNotifyComponent,
  [NotificationType.error]: ErrorNotifyComponent,
  [NotificationType.warning]: WarningNotifyComponent,
};

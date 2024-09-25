import { patchState, signalStore, type, withMethods } from '@ngrx/signals';
import { addEntity, setAllEntities, withEntities } from '@ngrx/signals/entities';
import { IReminder } from '@core/models/reminder';
import { inject } from '@angular/core';
import { RemindersApiService } from '@api/reminders/reminders-api.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe, tap } from 'rxjs';
import { NotificationService } from '@ui/notifiaction/service/notification.service';
import { CreateReminderType } from '@app/reminders/ui/create-reminder/create-reminder.type';

export const RemindersStore = signalStore(
  withEntities({ entity: type<IReminder>() }),
  withMethods((store, apiService = inject(RemindersApiService), notifyService = inject(NotificationService)) => ({
    loadAll: rxMethod<void>(
      pipe(
        exhaustMap(() =>
          apiService.getAll<IReminder>().pipe(
            tap({
              next: (reminders: IReminder[]) => {
                patchState(store, setAllEntities(reminders));
              },
              error: (error) => {
                notifyService.error('Ошибка при загрузке напоминаний');
                console.error(error);
              },
            }),
          ),
        ),
      ),
    ),
    createReminder: rxMethod<CreateReminderType>(
      pipe(
        exhaustMap((createReminderForm) =>
          apiService.create<CreateReminderType, IReminder>(createReminderForm).pipe(
            tap({
              next: (reminder: IReminder) => {
                patchState(store, addEntity(reminder));
              },
              error: (error) => {
                notifyService.error('Ошибка при создании напоминания');
                console.error(error);
              },
            }),
          ),
        ),
      ),
    ),
  })),
);

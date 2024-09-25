import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, InputSignal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { INote } from '@core/models/note';
import { RemindersStore } from '@app/reminders/reminders.store';
import { ModalService } from '@ui/modals/modal.service';
import { ReminderDataComponent } from '@ui/modals/reminder-data/reminder-data.component';
import { map, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { parseDateString } from '@app/reminders/ui/create-reminder/utils';

@Component({
  selector: 'notes-create-reminder',
  standalone: true,
  imports: [MatIcon],
  providers: [RemindersStore],
  templateUrl: './create-reminder.component.html',
  styleUrl: './create-reminder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateReminderComponent {
  public readonly note: InputSignal<INote> = input.required();
  private readonly destroyRef = inject(DestroyRef);
  private readonly remindersStore = inject(RemindersStore);
  private readonly modalService = inject(ModalService);

  createReminder() {
    const data: Record<string, unknown> = {
      date: new Date(),
      note: this.note(),
    };

    this.modalService
      .openDialog<ReminderDataComponent>(ReminderDataComponent, data)
      .afterClosed()
      .pipe(
        take(1),
        map((result) => ({
          reminderDate: parseDateString(result),
          noteId: this.note().id,
        })),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => this.remindersStore.createReminder(value));
  }
}

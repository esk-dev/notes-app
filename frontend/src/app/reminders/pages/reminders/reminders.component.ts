import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { RemindersStore } from '@app/reminders/reminders.store';
import { IReminder } from '@core/models/reminder';
import { ContainerComponent } from '@ui/container/container.component';
import { NoteCardComponent } from '@notes/ui/note-card/note-card.component';
import { CreateReminderComponent } from '@app/reminders/ui/create-reminder/create-reminder.component';
import { ReminderWidgetComponent } from '@app/reminders/ui/reminder-widget/reminder-widget.component';

@Component({
  selector: 'notes-reminders',
  standalone: true,
  imports: [ContainerComponent, NoteCardComponent, CreateReminderComponent, ReminderWidgetComponent],
  providers: [RemindersStore],
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemindersComponent implements OnInit {
  private readonly remindersStore = inject(RemindersStore);

  get reminders(): Signal<IReminder[]> {
    return this.remindersStore.entities;
  }

  ngOnInit() {
    this.remindersStore.loadAll();
  }
}

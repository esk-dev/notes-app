import { ChangeDetectionStrategy, Component, Input, input, InputSignal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { formatDate } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'notes-reminder-widget',
  standalone: true,
  imports: [MatIcon, MatTooltip],
  templateUrl: './reminder-widget.component.html',
  styleUrl: './reminder-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReminderWidgetComponent {
  readonly reminder: InputSignal<string> = input.required();

  get reminderTitle(): string {
    const formatedDate = formatDate(this.reminder(), 'dd.MM.yyyy, HH:mm', 'ru-RU');
    return `Напоминание к ${formatedDate}`;
  }
}

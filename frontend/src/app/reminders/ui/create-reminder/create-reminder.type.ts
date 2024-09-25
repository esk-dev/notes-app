import { IReminder } from '@core/models/reminder';

export type CreateReminderType = Omit<IReminder, 'id' | 'note'>;

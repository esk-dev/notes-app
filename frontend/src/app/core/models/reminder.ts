import { INote } from '@core/models/note';
import { TModel } from '@core/models/util-types';

export interface IReminder extends TModel {
  id: number;
  noteId: number;
  reminderDate: string;
  note: INote;
}

import { INote } from '@core/models/note';
/**
 *  @description Поля для заполнения из формы
 */
export type NoteFormFields = Omit<INote, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;

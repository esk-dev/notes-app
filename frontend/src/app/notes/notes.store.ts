import { NoteApiService } from '@api/note/note-api.service';
import { INote } from '@core/models/note';
import { patchState, signalStore, withComputed, withMethods } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, exhaustMap, pipe, tap } from 'rxjs';
import { NotificationService } from '@ui/notifiaction/service/notification.service';
import { removeEntity, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { Router } from '@angular/router';

export const NotesStore = signalStore(
  withEntities<INote>(),
  withComputed(({ entities }) => ({
    sortedByDescNotes: computed(() => {
      return entities().sort((a, b) => b.id - a.id);
    }),
  })),
  withMethods((store, apiService = inject(NoteApiService), notifyService = inject(NotificationService), router = inject(Router)) => ({
    deleteNote: rxMethod<INote>(
      pipe(
        exhaustMap((note: INote) => {
          const noteId: number = note.id;
          return apiService.delete<INote>(note.id).pipe(
            tap({
              next: () => {
                patchState(store, removeEntity(noteId));
              },
              error: (error) => {
                notifyService.error('Ошибка при удалении заметки');
                console.log(error);
              },
            }),
          );
        }),
      ),
    ),
    loadById: rxMethod<number>(
      pipe(
        exhaustMap((noteId: number) => {
          return apiService.getById<INote>(noteId).pipe(
            catchError(() => EMPTY),
            tap({
              next: (notes: INote) => {
                patchState(store, setAllEntities([notes]));
              },
              error: (error) => {
                notifyService.error('Ошибка при загрузке заметки');
                console.log(error);
              },
            }),
          );
        }),
      ),
    ),
    editNote: rxMethod<INote>(
      pipe(
        exhaustMap((note: INote) =>
          apiService.update<INote>(note).pipe(
            tap({
              next: (updatedNote: INote) => {
                patchState(store, updateEntity({ id: note.id, changes: updatedNote }));
                router.navigate(['/notes/']);
              },
              error: (error) => {
                notifyService.error('Ошибка при редактировании заметок');
                console.log(error);
              },
            }),
          ),
        ),
      ),
    ),
    loadAll: rxMethod<void>(
      pipe(
        exhaustMap(() =>
          apiService.getAll<INote>().pipe(
            tap({
              next: (notes: INote[]) => {
                patchState(store, setAllEntities(notes));
                patchState(store, {});
              },
              error: (error) => {
                notifyService.error('Ошибка при загрузке заметок');
                console.log(error);
              },
            }),
          ),
        ),
      ),
    ),
  })),
);

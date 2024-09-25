import { patchState, signalStore, type, withMethods } from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { ITag } from '@core/models/tag';
import { inject } from '@angular/core';
import { TagApiService } from '@api/tag/tag-api.service';
import { NotificationService } from '@ui/notifiaction/service/notification.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe, tap } from 'rxjs';

export const TagsStore = signalStore(
  withEntities({ entity: type<ITag>() }),
  withMethods((store, apiService = inject(TagApiService), notifyService = inject(NotificationService)) => ({
    loadAll: rxMethod<void>(
      pipe(
        exhaustMap(() =>
          apiService.getAll<ITag>().pipe(
            tap({
              next: (tags: ITag[]): void => {
                patchState(store, setAllEntities(tags));
              },
              error: (error): void => {
                notifyService.error('Ошибка загрузки тегов');
                console.error(error);
              },
            }),
          ),
        ),
      ),
    ),
    deleteTag: rxMethod<ITag>(
      pipe(
        exhaustMap((tag: ITag) =>
          apiService.delete(tag.id).pipe(
            tap({
              next: (): void => {
                patchState(store, removeEntity(tag.id));
                notifyService.success(`Тег ${tag.tagName} успешно удалён`);
              },
              error: (error): void => {
                notifyService.error('Ошибка удаления тега');
                console.error(error);
              },
            }),
          ),
        ),
      ),
    ),
    createTag: rxMethod<string>(
      pipe(
        exhaustMap((tagName: string) => {
          const newTag = {
            tagName: tagName,
          };
          return apiService.create<{ tagName: string }, ITag>(newTag).pipe(
            tap({
              next: (tag: ITag): void => {
                patchState(store, addEntity(tag));
                notifyService.success(`Тег ${tag.tagName} успешно создан`);
              },
              error: (error): void => {
                notifyService.error('Ошибка при создании тега');
                console.error(error);
              },
            }),
          );
        }),
      ),
    ),
    editTag: rxMethod<ITag>(
      pipe(
        exhaustMap((updatedTag: ITag) => {
          return apiService.update<ITag>(updatedTag).pipe(
            tap({
              next: (tag: ITag): void => {
                patchState(store, updateEntity({ id: tag.id, changes: tag }));
              },
              error: (error): void => {
                notifyService.error('Ошибка при редактировании тега');
                console.error(error);
              },
            }),
          );
        }),
      ),
    ),
  })),
);

import { Route } from '@angular/router';

export const NotesRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    loadComponent: () => import('@notes/pages/notes/notes.component').then((m) => m.NotesComponent),
    title: 'Заметки',
  },
  {
    path: 'create',
    loadComponent: () => import('@notes/pages/create-note/create-note.component').then((m) => m.CreateNoteComponent),
    title: 'Заметки - Создание',
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('@notes/pages/edit-note/edit-note.component').then((m) => m.EditNoteComponent),
    title: 'Заметки - Редактирование',
  },
];

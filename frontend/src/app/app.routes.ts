import { Routes } from '@angular/router';
import { authGuard } from '@app/routes/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'NotesApp',
    loadComponent: () => import('@ui/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: `/notes`,
        pathMatch: 'full',
      },
      {
        title: 'Заметки',
        path: 'notes',
        loadChildren: () => import('@app/routes/notes.routes').then((m) => m.NotesRoutes),
        canActivate: [authGuard],
      },
      {
        title: 'Напоминания',
        path: 'reminders',
        loadComponent: () => import('@app/reminders/pages/reminders/reminders.component').then((m) => m.RemindersComponent),
        canActivate: [authGuard],
      },
      {
        title: 'Теги',
        path: 'tags',
        loadComponent: () => import('@app/tags/pages/tags/tags.component').then((m) => m.TagsComponent),
        canActivate: [authGuard],
      },
      {
        title: 'Авторизация',
        path: 'auth',
        loadChildren: () => import('@app/routes/auth.routes').then((r) => r.AuthRoutes),
      },
    ],
  },
];

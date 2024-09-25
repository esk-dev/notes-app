import { INavigationLink } from './navigation.interface';

export const NAVIGATION_LINKS: INavigationLink[] = [
  {
    route: 'notes/list',
    label: 'Заметки',
  },
  {
    route: 'notes/create',
    label: 'Создать заметку',
  },
  {
    route: 'reminders',
    label: 'Напоминания',
  },
  {
    route: 'tags',
    label: 'Теги',
  },
];

export const AUTH_LINKS: INavigationLink[] = [
  {
    route: 'auth/login',
    label: 'Логин',
  },
  {
    route: 'auth/register',
    label: 'Регистрация',
  },
];

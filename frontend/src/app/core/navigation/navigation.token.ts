import { InjectionToken, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { AUTH_LINKS, NAVIGATION_LINKS } from './paths';
import { INavigationLink } from './navigation.interface';

export const LINKS = new InjectionToken<INavigationLink[]>('NavigationLinks');

export const UNAUTHORIZED_LINKS = new InjectionToken<INavigationLink[]>('UnauthorizedLinks');

export function provideNavigationPaths(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: LINKS,
      useValue: NAVIGATION_LINKS,
    },
    {
      provide: UNAUTHORIZED_LINKS,
      useValue: AUTH_LINKS,
    },
  ]);
}

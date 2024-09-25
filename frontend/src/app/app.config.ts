import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import localeRu from '@angular/common/locales/ru';
import { routes } from './app.routes';
import { provideEnvironment } from '@core/env';
import { environment } from '../environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNavigationPaths } from '@core/navigation/navigation.token';
import { headersInterceptor } from '@core/http/interceptors/headers.interceptor';
import { DATE_PIPE_DEFAULT_OPTIONS, registerLocaleData } from '@angular/common';

registerLocaleData(localeRu, 'ru');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideNavigationPaths(),
    provideAnimationsAsync(),
    provideEnvironment(environment),
    provideHttpClient(withInterceptors([headersInterceptor])),
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'shortDate', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
    },
    { provide: LOCALE_ID, useValue: 'ru-RU' },
  ],
};

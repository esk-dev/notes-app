import { InjectionToken, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

export interface IEnvironment {
  API_URL: string;
}

export const ENVIRONMENT: InjectionToken<IEnvironment> = new InjectionToken<IEnvironment>('Environment');

export function provideEnvironment(environment: IEnvironment): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
  ]);
}

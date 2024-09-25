import { FormControl } from '@angular/forms';

export type FormFor<T> = {
  [P in keyof T]: FormControl<T[P]>;
};

export type ValidationMessageType = Record<string, string>;

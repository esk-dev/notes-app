import { AbstractControl, ValidatorFn } from '@angular/forms';

const SHARED_VALIDATORS: Record<string, string> = {
  required: 'Поле обязательно для заполнения',
};

export const AUTH_FORM_VALIDATORS = {
  username: {
    ...SHARED_VALIDATORS,
    'min-length': 'Минимальная длина должна быть 5 символов',
    cyrillic: 'Имя пользователя не должно содержать символы кириллицы',
  },
  email: {
    ...SHARED_VALIDATORS,
    email: 'Невалидный email адрес',
  },
  password: {
    ...SHARED_VALIDATORS,
    minlength: 'Минимальная длина пароля должна быть 6 символов',
    digit: 'Пароль должен содержать цифры',
    nonAlphanumeric: 'Пароль должен содержать хотя бы один не буквенно-цифровой символ.',
  },
};

export function nonAlphanumericValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.value;
    const nonAlphanumericRegex = /[^a-zA-Z0-9]/;
    if (!nonAlphanumericRegex.test(password)) {
      return { nonAlphanumeric: true };
    }
    return null;
  };
}

export function digitValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.value;
    const digitRegex = /\d/;
    if (!digitRegex.test(password)) {
      return { digit: true };
    }
    return null;
  };
}

export function noCyrillicValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const username = control.value;
    const cyrillicRegex = /[а-яА-ЯёЁ]/;
    if (cyrillicRegex.test(username)) {
      return { cyrillic: true };
    }
    return null;
  };
}

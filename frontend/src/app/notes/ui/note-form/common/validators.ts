const SHARED_VALIDATORS: Record<string, string> = {
  required: 'Поле обязательно для заполнения',
};

export const NOTE_FORM_VALIDATORS = {
  tags: {
    ...SHARED_VALIDATORS,
  },
  content: {
    ...SHARED_VALIDATORS,
    minlength: 'Минимальная длина должна быть 5 символов',
    maxlength: 'Максимальная длина должна быть не больше 280 символов',
  },
  title: {
    ...SHARED_VALIDATORS,
    minlength: 'Минимальная длина должна быть 5 символов',
    maxlength: 'Максимальная длина должна быть не больше 50 символов',
  },
};

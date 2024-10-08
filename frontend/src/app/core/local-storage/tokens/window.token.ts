import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';

export const WA_WINDOW = new InjectionToken<Window>('[WA_WINDOW]', {
  factory: () => {
    const { defaultView } = inject(DOCUMENT);

    if (!defaultView) {
      throw new Error('Window is not available');
    }

    return defaultView;
  },
});

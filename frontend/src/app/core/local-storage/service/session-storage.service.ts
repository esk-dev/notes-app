import { inject, Injectable } from '@angular/core';
import { WA_WINDOW } from '@core/local-storage/tokens/window.token';
import { SESSION_STORAGE } from '@core/local-storage/tokens/session-storage.token';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService implements Storage {
  private readonly sessionStorage = inject(SESSION_STORAGE);
  private readonly windowRef = inject(WA_WINDOW);

  public get length(): number {
    return this.sessionStorage.length;
  }

  public getItem(key: string): string | null {
    return this.sessionStorage.getItem(key);
  }

  public setItem(key: string, value: string): void {
    const oldValue = this.getItem(key);

    this.sessionStorage.setItem(key, value);
    this.notify(key, value, oldValue);
  }

  public removeItem(key: string): void {
    const oldValue = this.getItem(key);

    this.sessionStorage.removeItem(key);
    this.notify(key, null, oldValue);
  }

  public clear(): void {
    this.sessionStorage.clear();
    this.notify(null, null, null);
  }

  public key(index: number): string | null {
    return this.sessionStorage.key(index);
  }

  private notify(key: string | null, newValue: string | null, oldValue: string | null): void {
    const event = new StorageEvent('storage', {
      key,
      newValue,
      oldValue,
      storageArea: this.sessionStorage,
      url: this.windowRef.location.href,
    });

    this.windowRef.dispatchEvent(event);
  }
}

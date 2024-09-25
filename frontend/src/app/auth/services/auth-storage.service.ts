import { Injectable } from '@angular/core';
import { SessionStorageService } from '@core/local-storage/service/session-storage.service';
import { IUserData } from '@app/auth/user.interface';
import { BehaviorSubject } from 'rxjs';

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  private readonly _isAuthed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly storageService: SessionStorageService) {
    this._isAuthed$.next(this.isLoggedIn());
  }

  get isAuthed$() {
    return this._isAuthed$.asObservable();
  }
  clean(): void {
    this.storageService.clear();
    this._isAuthed$.next(false);
  }

  saveUser(user: IUserData): void {
    this.storageService.removeItem(USER_KEY);
    this.storageService.setItem(USER_KEY, JSON.stringify(user));
    this._isAuthed$.next(true);
  }

  getUser(): IUserData | null {
    const user: string | null = this.storageService.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  isLoggedIn(): boolean {
    const user = this.storageService.getItem(USER_KEY);
    return !!user;
  }
}

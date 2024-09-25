import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpService } from '@core/http';
import { IUserData } from '@app/auth/user.interface';
import { AuthStorageService } from '@app/auth/services/auth-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpService: HttpService,
    private readonly router: Router,
    private readonly authStorageService: AuthStorageService,
  ) {}

  login(username: string, password: string): Observable<unknown> {
    return this.httpService
      .post<IUserData>('/account/login', {
        username,
        password,
      })
      .pipe(tap((response: IUserData) => this.authStorageService.saveUser(response)));
  }

  register(username: string, email: string, password: string): Observable<unknown> {
    return this.httpService
      .post<IUserData>('/account/register', {
        username,
        email,
        password,
      })
      .pipe(tap((response: IUserData) => this.authStorageService.saveUser(response)));
  }

  async logout(): Promise<void> {
    this.authStorageService.clean();
    await this.router.navigate(['/auth/login']);
  }
}

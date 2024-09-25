import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ENVIRONMENT, IEnvironment } from '@core/env';
import { ApiRequestOptions, getApiRequestOptions, handleError } from '@core/http/http.util';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private readonly httpClient: HttpClient,
    @Inject(ENVIRONMENT) private readonly env: IEnvironment,
  ) {}

  makeUrl(url: string): string {
    return url.indexOf('http') === 0 ? url : `${this.env.API_URL}${url}`;
  }

  get<T = void>(url: string, options?: Partial<ApiRequestOptions>): Observable<T> {
    return this.httpClient.get<T>(this.makeUrl(url), getApiRequestOptions(options)).pipe(catchError(handleError));
  }

  patch<T = void>(url: string, body: null | unknown | Record<string, unknown>, options?: Partial<ApiRequestOptions>): Observable<T> {
    return this.httpClient.patch<T>(this.makeUrl(url), body, getApiRequestOptions(options)).pipe(catchError(handleError));
  }

  post<T = void>(url: string, body?: null | unknown, options?: Partial<ApiRequestOptions>): Observable<T> {
    return this.httpClient.post<T>(this.makeUrl(url), body ?? null, getApiRequestOptions(options)).pipe(catchError(handleError));
  }

  put<T = void>(url: string, body: null | unknown, options?: Partial<ApiRequestOptions>): Observable<T> {
    return this.httpClient.put<T>(this.makeUrl(url), body, getApiRequestOptions(options)).pipe(catchError(handleError));
  }

  delete<T = void>(url: string, options?: Partial<ApiRequestOptions>): Observable<HttpEvent<T>> {
    return this.httpClient.delete<HttpResponse<T>>(this.makeUrl(url), getApiRequestOptions(options)).pipe(catchError(handleError));
  }
}

import { inject, Optional } from '@angular/core';
import { HttpService } from '@core/http';
import { TModel } from '@core/models/util-types';
import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { IBaseApi } from '@api/interfaces/base-api.interface';

export class BaseApiService implements IBaseApi {
  public readonly apiUri: string;
  public readonly httpService: HttpService = inject(HttpService);

  constructor(@Optional() apiUri: string) {
    this.apiUri = apiUri || '';
  }

  create<T extends Record<string, unknown>, K extends TModel>(body: T): Observable<K> {
    return this.httpService.post<K>(`/${this.apiUri}`, body);
  }

  getById<T extends TModel>(id: string | number): Observable<T> {
    return this.httpService.get<T>(`/${this.apiUri}/${id}`);
  }

  getAll<T extends TModel>(): Observable<T[]> {
    return this.httpService.get<T[]>(`/${this.apiUri}`);
  }

  update<T extends TModel>(body: T): Observable<T> {
    const { id } = body;
    return this.httpService.put<T>(`/${this.apiUri}/${id}`, body);
  }

  delete<T extends TModel>(id: string | number): Observable<HttpEvent<T>> {
    return this.httpService.delete<T>(`/${this.apiUri}/${id}`);
  }
}

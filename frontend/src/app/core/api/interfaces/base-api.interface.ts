import { Observable } from 'rxjs';
import { HttpService } from '@core/http';
import { TModel } from '@core/models/util-types';
import { HttpEvent } from '@angular/common/http';

export interface IBaseApi {
  readonly apiUri: string;
  readonly httpService: HttpService;
  /**
   * POST
   */
  create<T extends TModel>(body: T): Observable<T>;
  /**
   * GET
   */
  getById<T extends TModel>(id: number | string): Observable<T>;
  /**
   * GET
   */
  getAll<T extends TModel>(): Observable<T[]>;
  /**
   * PUT
   */
  update<T extends TModel>(body: T): Observable<T>;
  /**
   * DELETE
   */
  delete<T extends TModel>(id: number | string): Observable<HttpEvent<T>>;
}

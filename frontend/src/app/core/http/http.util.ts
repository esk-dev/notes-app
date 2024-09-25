import { HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';

export interface ApiRequestOptions {
  headers: Record<string, any>;
  params: Record<string, any>;
  reportProgress: boolean;
  observe: any;
  responseType: any;
  withCredentials: boolean;
}

export function getApiRequestOptions(options?: Partial<ApiRequestOptions>): Partial<ApiRequestOptions> | undefined {
  if (options) {
    let params: Record<string, any> | HttpParams = {};
    let headers: Record<string, any> = {};
    if (options.headers) {
      headers = !(options?.headers instanceof HttpHeaders) ? new HttpHeaders(options.headers) : options.headers;
    }
    if (options.params) {
      params = new HttpParams();

      for (const propKey of Object.keys(options.params).sort()) {
        if (options.params[propKey] !== undefined) {
          if (Array.isArray(options.params[propKey])) {
            options.params[propKey].forEach((item: any) => {
              params = params.append(`${propKey}[]`, item == null ? 'NULL' : item.toString());
            });
          } else {
            params = params.append(propKey, options.params[propKey] == null ? 'NULL' : options.params[propKey].toString());
          }
        }
      }
    }

    return { ...options, params, headers };
  }

  return;
}

export function handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    console.error('An error occurred:', error.error);
  } else {
    console.error(`Backend returned code ${error.status}, body was: `, error.error);
  }
  return throwError(() => new Error(`${error.error}`));
}

import { Injectable } from '@angular/core';
import { BaseApiService } from '@core/api/common/base-api.service';
import { ITag } from '@core/models/tag';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TagApiService extends BaseApiService {
  constructor() {
    super('Tags');
  }

  public searchTagsByName(query: string): Observable<ITag[]> {
    return this.httpService.get<ITag[]>(`/${this.apiUri}/search`, {
      params: new HttpParams({
        fromObject: {
          query,
        },
      }),
    });
  }
}

import { Injectable } from '@angular/core';
import { BaseApiService } from '@core/api/common/base-api.service';
import { INote } from '@core/models/note';
import { ITag } from '@core/models/tag';
import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { INoteApi } from '@api/interfaces/note-api.interface';

@Injectable({
  providedIn: 'root',
})
export class NoteApiService extends BaseApiService implements INoteApi {
  constructor() {
    super('Notes');
  }

  addTagToNote(note: INote, tag: ITag): Observable<INote> {
    const uri = this.apiUri;
    const { id } = note;
    const { tagName } = tag;
    return this.httpService.post<INote>(`${uri}/${id}/tags/${tagName}`);
  }

  removeTagFromNote(note: INote, tag: ITag): Observable<HttpEvent<INote>> {
    const uri = this.apiUri;
    const { id } = note;
    const { tagName } = tag;
    return this.httpService.delete<INote>(`${uri}/${id}/tags/${tagName}`);
  }
}

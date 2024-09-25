import { IBaseApi } from '@api/interfaces/base-api.interface';
import { INote } from '@core/models/note';
import { ITag } from '@core/models/tag';
import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';

export interface INoteApi extends IBaseApi {
  addTagToNote(note: INote, tag: ITag): Observable<INote>;
  removeTagFromNote(note: INote, tag: ITag): Observable<HttpEvent<INote>>;
}

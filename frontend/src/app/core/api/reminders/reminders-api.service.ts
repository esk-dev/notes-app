import { Injectable } from '@angular/core';
import { BaseApiService } from '@api/common/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class RemindersApiService extends BaseApiService {
  constructor() {
    super('Reminders');
  }
}

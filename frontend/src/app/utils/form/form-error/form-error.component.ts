import { ChangeDetectionStrategy, Component, input, InputSignal, OnInit } from '@angular/core';
import { MatError } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { ValidationMessageType } from '@app/utils/form/form';
import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'notes-form-error',
  standalone: true,
  imports: [MatError, KeyValuePipe, AsyncPipe],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent implements OnInit {
  public readonly control: InputSignal<FormControl> = input.required();
  public readonly validationMessagesMap: InputSignal<ValidationMessageType> = input.required();

  public messages$!: Observable<Array<string>>;

  constructor() {}

  ngOnInit(): void {
    this.messages$ = this.control().statusChanges.pipe(
      map(() => {
        const currentErrors: Array<string> = [];
        const messageMap: ValidationMessageType = this.validationMessagesMap();

        for (const key of Object.keys(messageMap)) {
          if (this.control().getError(key)) {
            currentErrors.push(messageMap[key]);
          }
        }

        return currentErrors;
      }),
    );
  }
}

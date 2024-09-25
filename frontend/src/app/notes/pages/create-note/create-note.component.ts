import { Component, DestroyRef, inject } from '@angular/core';
import { NoteFormComponent } from '../../ui/note-form/note-form.component';
import { ContainerComponent } from '@ui/container/container.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormFor } from '@app/utils/form/form';
import { NoteFormFields } from '@notes/ui/note-form/common/note-form.types';
import { MatButton } from '@angular/material/button';
import { createNoteFormUtil, mapToTagName } from '@notes/ui/note-form/common/create-note-form.util';
import { NoteApiService } from '@api/note/note-api.service';
import { Router } from '@angular/router';
import { NotificationService } from '@ui/notifiaction/service/notification.service';
import { INote } from '@core/models/note';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * @description Типизированная форма
 */
export type NoteForm = FormFor<NoteFormFields>;

@Component({
  selector: 'notes-create-note',
  standalone: true,
  imports: [NoteFormComponent, ContainerComponent, MatButton],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.scss',
})
export class CreateNoteComponent {
  public readonly form: FormGroup<NoteForm>;
  private readonly destroyRef$ = inject(DestroyRef);

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly notesApiService: NoteApiService,
    private readonly notifyService: NotificationService,
  ) {
    this.form = createNoteFormUtil(this.fb);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      this.form.markAsTouched();
      this.notifyService.warn('Невалидная форма');
      return;
    }
    this.form.disable();

    const { title, content } = this.form.getRawValue();
    const payload: NoteFormFields = {
      title,
      content,
      tags: mapToTagName<NoteFormFields>(this.form),
    };

    this.notesApiService
      .create<NoteFormFields, INote>(payload)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef$))
      .subscribe({
        next: () => {
          this.router.navigate(['/notes/']);
        },
        error: (error) => {
          this.notifyService.error(error?.error?.message);
          this.form.enable();
        },
      });
  }
}

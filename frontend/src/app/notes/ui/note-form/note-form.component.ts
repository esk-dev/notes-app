import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TagsAutocompleteControlComponent } from './components/tags-autocomplete-control/tags-autocomplete-control.component';
import { NoteContentComponent } from './components/note-content/note-content.component';
import { NoteTitleComponent } from './components/note-title/note-title.component';
import { NoteForm } from '../../pages/create-note/create-note.component';
import { FormErrorComponent } from '@app/utils/form/form-error/form-error.component';
import { NOTE_FORM_VALIDATORS } from '@notes/ui/note-form/common/validators';

@Component({
  selector: 'notes-note-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    TagsAutocompleteControlComponent,
    MatLabel,
    NoteContentComponent,
    NoteTitleComponent,
    FormErrorComponent,
  ],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteFormComponent {
  @Input() public form!: FormGroup<NoteForm>;
  protected readonly NOTE_FORM_VALIDATORS = NOTE_FORM_VALIDATORS;
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'notes-note-content',
  standalone: true,
  imports: [MatFormField, ReactiveFormsModule, MatInput, MatLabel],
  templateUrl: './note-content.component.html',
  styleUrl: './note-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteContentComponent {
  @Input() public control!: FormControl;
}

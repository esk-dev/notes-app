import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'notes-note-title',
  standalone: true,
  imports: [MatFormField, ReactiveFormsModule, MatInput, MatLabel],
  templateUrl: './note-title.component.html',
  styleUrl: './note-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteTitleComponent {
  @Input() public control!: FormControl;
}

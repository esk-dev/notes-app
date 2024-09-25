import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatChipGrid, MatChipRow } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { INote } from '@core/models/note';
import { TagBadgeComponent } from '@app/tags/ui/tag-badge/tag-badge.component';

@Component({
  selector: 'notes-note-card',
  standalone: true,
  imports: [
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCardSubtitle,
    MatCardActions,
    MatIcon,
    MatDivider,
    TagBadgeComponent,
    MatChipRow,
    MatChipGrid,
    DatePipe,
  ],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteCardComponent {
  public readonly note: InputSignal<INote> = input.required();
}

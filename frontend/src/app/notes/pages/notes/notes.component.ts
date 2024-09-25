import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { ContainerComponent } from '@ui/container/container.component';
import { NoteCardComponent } from '@notes/ui/note-card/note-card.component';
import { NotesStore } from '@notes/notes.store';
import { INote } from '@core/models/note';
import { Router } from '@angular/router';
import { ModalService } from '@ui/modals/modal.service';
import { take, tap } from 'rxjs';
import { ConfirmationDialogData } from '@ui/modals/confirmation-dialog/confirmation-dialog-data.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';
import { CreateReminderComponent } from '@app/reminders/ui/create-reminder/create-reminder.component';
import { ReminderWidgetComponent } from '@app/reminders/ui/reminder-widget/reminder-widget.component';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  standalone: true,
  imports: [ContainerComponent, NoteCardComponent, MatIcon, CreateReminderComponent, ReminderWidgetComponent, MatTooltip],
  providers: [NotesStore],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements OnInit {
  private readonly router: Router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly modalService = inject(ModalService);
  private readonly notesStore = inject(NotesStore);

  public readonly notes: Signal<INote[]> = this.notesStore.sortedByDescNotes;

  ngOnInit(): void {
    this.notesStore.loadAll();
  }

  redirectToEditPage(note: INote): void {
    this.router.navigate(['/notes/edit/', note.id]);
  }

  requestDeleteNote(note: INote): void {
    this.modalService
      .openConfirmationDialog(this.createDialog(note.title))
      .pipe(
        tap((result: boolean) => {
          if (result) {
            this.notesStore.deleteNote(note);
          }
        }),
        take(1),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private createDialog(title: string): ConfirmationDialogData {
    return {
      question: `Вы действительно хотите удалить заметку?`,
      title: `Удаление заметки "${title}"`,
    };
  }
}

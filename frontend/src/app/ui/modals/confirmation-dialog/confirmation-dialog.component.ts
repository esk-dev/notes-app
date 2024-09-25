import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { ConfirmationDialogData } from '@ui/modals/confirmation-dialog/confirmation-dialog-data.interface';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'notes-confirmation-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogActions, MatDialogContent, MatButton, MatDialogClose],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  private readonly matDialogData: ConfirmationDialogData = inject(MAT_DIALOG_DATA);

  get data(): ConfirmationDialogData {
    return this.matDialogData;
  }
}

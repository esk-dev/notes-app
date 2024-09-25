import { ChangeDetectionStrategy, Component, DestroyRef, inject, model, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'notes-reminder-data',
  standalone: true,
  imports: [
    MatDialogTitle,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatDialogClose,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }],
  templateUrl: './reminder-data.component.html',
  styleUrl: './reminder-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReminderDataComponent {
  private readonly data = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef);

  readonly reminderDate = model(new Date());

  constructor() {}

  get modalData() {
    return this.data;
  }

  onNoClick() {
    this.data.reminderDate = this.reminderDate();
    this.dialogRef.close();
  }
}

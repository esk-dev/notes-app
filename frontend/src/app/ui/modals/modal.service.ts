import { inject, Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogData } from '@ui/modals/confirmation-dialog/confirmation-dialog-data.interface';
import { ConfirmationDialogComponent } from '@ui/modals/confirmation-dialog/confirmation-dialog.component';
import { map, Observable } from 'rxjs';
import { ModalsComponentsType, ModalsDataTypes } from '@ui/modals/modals.types';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly dialog = inject(MatDialog);

  constructor() {}

  openDialog<T extends ModalsComponentsType>(component: Type<T>, data: ModalsDataTypes): MatDialogRef<unknown> {
    return this.dialog.open(component, {
      data,
      width: '400px',
    });
  }

  openConfirmationDialog(data: ConfirmationDialogData): Observable<boolean> {
    return this.openDialog<ConfirmationDialogComponent>(ConfirmationDialogComponent, data)
      .afterClosed()
      .pipe(map((answer) => Boolean(answer)));
  }
}

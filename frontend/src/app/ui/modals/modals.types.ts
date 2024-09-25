import { ConfirmationDialogData } from '@ui/modals/confirmation-dialog/confirmation-dialog-data.interface';
import { ConfirmationDialogComponent } from '@ui/modals/confirmation-dialog/confirmation-dialog.component';
import { SaveFormDataType } from '@ui/modals/save-form-data.interface';
import { ReminderDataComponent } from '@ui/modals/reminder-data/reminder-data.component';

export type ModalsDataTypes = ConfirmationDialogData | SaveFormDataType;
export type ModalsComponentsType = ConfirmationDialogComponent | ReminderDataComponent;

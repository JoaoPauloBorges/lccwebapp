import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmationDialogData {
  title: string,
  content: string,
}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
})
export class ConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

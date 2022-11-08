import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-column-modal',
  templateUrl: './new-column-modal.component.html',
  styleUrls: ['./new-column-modal.component.scss'],
})
export class NewColumnModalComponent {
  constructor(public dialogRef: MatDialogRef<NewColumnModalComponent>, @Inject(MAT_DIALOG_DATA) public title: string) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

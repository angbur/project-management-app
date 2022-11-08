import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.scss'],
})
export class NewTaskModalComponent {
  constructor(public dialogRef: MatDialogRef<NewTaskModalComponent>, @Inject(MAT_DIALOG_DATA) public title: string) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

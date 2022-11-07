import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-update-task-modal',
  templateUrl: './update-task-modal.component.html',
  styleUrls: ['./update-task-modal.component.scss']
})
export class UpdateTaskModalComponent {

  constructor(
    public dialogRef: MatDialogRef<UpdateTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public title: string,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  };

};

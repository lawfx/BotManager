import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-notification-dialog',
  templateUrl: './create-notification-dialog.component.html',
  styleUrls: ['./create-notification-dialog.component.css']
})
export class CreateNotificationDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<CreateNotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JSON
  ) {}

  ngOnInit() {}

  onCancel() {
    this.dialogRef.close(false);
  }

  onCreate() {
    this.dialogRef.close(true);
  }
}

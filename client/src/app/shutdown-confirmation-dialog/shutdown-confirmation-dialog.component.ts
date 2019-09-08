import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-shutdown-confirmation-dialog',
  templateUrl: './shutdown-confirmation-dialog.component.html',
  styleUrls: ['./shutdown-confirmation-dialog.component.css']
})
export class ShutdownConfirmationDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ShutdownConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JSON
  ) {}

  ngOnInit() {}

  onCancel() {
    this.dialogRef.close(false);
  }

  onConfirm() {
    this.dialogRef.close(true);
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateNotificationDialogComponent } from '../create-notification-dialog/create-notification-dialog.component';

@Component({
  selector: 'app-janusz',
  templateUrl: './janusz.component.html',
  styleUrls: ['./janusz.component.css']
})
export class JanuszComponent implements OnInit {
  constructor(private createNotificationDialog: MatDialog) {}

  ngOnInit() {}

  onCreateNotification() {
    const dialogRef = this.createNotificationDialog.open(
      CreateNotificationDialogComponent,
      {
        width: '800px',
        autoFocus: false,
        restoreFocus: false,
        disableClose: true
      }
    );

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JanuszNotificationDialogComponent } from '../janusz-notification-dialog/janusz-notification-dialog.component';

@Component({
  selector: 'app-janusz',
  templateUrl: './janusz.component.html',
  styleUrls: ['./janusz.component.css']
})
export class JanuszComponent implements OnInit {
  constructor(private januszNotificationDialog: MatDialog) {}

  ngOnInit() {}

  onCreateNotification() {
    const dialogRef = this.januszNotificationDialog.open(
      JanuszNotificationDialogComponent,
      {
        width: '800px',
        autoFocus: false,
        restoreFocus: false,
        data: { isCreating: true }
      }
    );

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      // TODO send refresh to janusz-notification-component
    });
  }
}

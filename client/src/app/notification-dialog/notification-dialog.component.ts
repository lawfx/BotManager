import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JanuszService } from '../janusz.service';
import { Message } from '../interfaces';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css']
})
export class NotificationDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<NotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotificationData,
    private januszService: JanuszService
  ) {}

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    this.januszService
      .getMessages(this.data.notificationId)
      .subscribe((ms: Message[]) => {
        console.log(ms);
      });
  }
}

interface NotificationData {
  notificationId: number;
}

import { Component, OnInit } from '@angular/core';

import { Notification } from '../interfaces';
import { JanuszService } from '../janusz.service';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-janusz-notifications',
  templateUrl: './janusz-notifications.component.html',
  styleUrls: ['./janusz-notifications.component.css']
})
export class JanuszNotificationsComponent implements OnInit {
  displayedColumns: string[] = [
    'label',
    'creator',
    'active',
    'dayOfWeek',
    'month',
    'date',
    'hour',
    'minute'
  ];
  notifications: Notification[];
  notificationsInterval: NodeJS.Timer;

  constructor(
    private januszService: JanuszService,
    private notificationDialog: MatDialog
  ) {}

  ngOnInit() {
    this.notificationsInterval = setInterval(() => {
      this.getNotifications();
    }, 15000);
    this.getNotifications();
  }

  getNotifications() {
    this.januszService.getNotifications().subscribe((ns: Notification[]) => {
      this.notifications = ns;
      console.log(this.notifications);
    });
  }

  openNotificationDialog(notificationId: number) {
    const dialogRef = this.notificationDialog.open(
      NotificationDialogComponent,
      {
        width: '800px',
        data: { notificationId },
        autoFocus: false,
        restoreFocus: false
      }
    );

    dialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        // this.botService
        //   .shutdown(this.botName)
        //   .subscribe(() => {}, err => console.error(err));
      }
    });
  }
}

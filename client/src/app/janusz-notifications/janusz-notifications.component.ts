import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

import { Notification, Message } from '../interfaces';
import { JanuszService } from '../janusz.service';
import { MatDialog } from '@angular/material/dialog';
import { JanuszNotificationDialogComponent } from '../janusz-notification-dialog/janusz-notification-dialog.component';
import { JanuszMessageDialogComponent } from '../janusz-message-dialog/janusz-message-dialog.component';

@Component({
  selector: 'app-janusz-notifications',
  templateUrl: './janusz-notifications.component.html',
  styleUrls: ['./janusz-notifications.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class JanuszNotificationsComponent implements OnInit {
  notificationColumns: string[] = [
    'label',
    'creator',
    'active',
    'dayOfWeek',
    'month',
    'date',
    'hour',
    'minute',
    'actions'
  ];
  notifications: Notification[];
  expandedNotification: Notification | null;

  messageColumns: string[] = ['author', 'message', 'actions'];
  messages: Message[] = [];

  constructor(
    private januszService: JanuszService,
    private januszNotificationDialog: MatDialog,
    private januszMessageDialog: MatDialog
  ) {}

  ngOnInit() {
    this.getNotifications();
  }

  onExpandRow(id: number) {
    this.getMessages(id);
  }

  /** Notifications */

  getNotifications() {
    this.januszService.getNotifications().subscribe((ns: Notification[]) => {
      this.notifications = ns;
    });
  }

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
      if (res) {
        this.getNotifications();
      }
    });
  }

  onEditNotification(notification: Notification, event: Event) {
    event.stopPropagation();
    const dialogRef = this.januszNotificationDialog.open(
      JanuszNotificationDialogComponent,
      {
        width: '800px',
        autoFocus: false,
        restoreFocus: false,
        data: { isCreating: false, notification }
      }
    );

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getNotifications();
      }
    });
  }

  onDeleteNotification(notification: Notification, event: Event) {
    event.stopPropagation();
    this.januszService.deleteNotification(notification.id).subscribe(() => {
      this.getNotifications();
    });
  }

  /** Messages */

  getMessages(notificationId: number) {
    this.januszService
      .getMessages(notificationId)
      .subscribe((ms: Message[]) => {
        this.messages = ms;
      });
  }

  onAddMessage() {
    const dialogRef = this.januszMessageDialog.open(
      JanuszMessageDialogComponent,
      {
        width: '600px',
        autoFocus: false,
        restoreFocus: false,
        data: { isAdding: true, notificationId: this.expandedNotification.id }
      }
    );

    dialogRef.afterClosed().subscribe(res => {
      if (res && this.expandedNotification.id !== undefined) {
        this.getMessages(this.expandedNotification.id);
      }
    });
  }

  onEditMessage(message: Message) {
    const dialogRef = this.januszMessageDialog.open(
      JanuszMessageDialogComponent,
      {
        width: '600px',
        autoFocus: false,
        restoreFocus: false,
        data: { isAdding: false, message }
      }
    );

    dialogRef.afterClosed().subscribe(res => {
      if (res && this.expandedNotification.id !== undefined) {
        this.getMessages(this.expandedNotification.id);
      }
    });
  }

  onDeleteMessage(messageId: number) {
    this.januszService.deleteMessage(messageId).subscribe(() => {
      this.getMessages(this.expandedNotification.id);
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

import { Notification, Message, ConfirmationDialogData } from '../interfaces';
import { JanuszService } from '../janusz.service';
import { JanuszNotificationDialogComponent } from '../janusz-notification-dialog/janusz-notification-dialog.component';
import { JanuszMessageDialogComponent } from '../janusz-message-dialog/janusz-message-dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

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
  private paginator: MatPaginator;

  @ViewChild(MatPaginator, { static: false }) set matPaginator(
    mp: MatPaginator
  ) {
    this.paginator = mp;
    this.notifications.paginator = this.paginator;
  }

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
  notifications = new MatTableDataSource<Notification>();
  expandedNotification: Notification | null;

  messageColumns: string[] = ['author', 'message', 'actions'];
  messages: Message[] = [];

  constructor(
    private januszService: JanuszService,
    private januszNotificationDialog: MatDialog,
    private januszMessageDialog: MatDialog,
    private confirmDialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getNotifications();
  }

  onExpandRow(id: number) {
    this.getMessages(id);
  }

  /** Notifications */

  getNotifications() {
    this.januszService.getNotifications().subscribe({
      next: (ns: Notification[]) => {
        this.notifications = new MatTableDataSource<Notification>(ns);
        this.notifications.paginator = this.paginator;
      },
      error: err => {
        console.error(err);
        this.toastr.error('Notifications fetch failed');
      }
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

    dialogRef.afterClosed().subscribe({
      next: (val: number) => {
        if (val === 0) {
          this.toastr.error('Notification creation failed');
        } else if (val === 1) {
          this.toastr.success('Notification created');
          this.getNotifications();
        }
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

    dialogRef.afterClosed().subscribe({
      next: (val: number) => {
        if (val === 0) {
          this.toastr.error('Notification edit failed');
        } else if (val === 1) {
          this.toastr.success('Notification edited');
          this.getNotifications();
        }
      }
    });
  }

  onDeleteNotification(notification: Notification, event: Event) {
    event.stopPropagation();
    const data: ConfirmationDialogData = {
      title: `Delete notification`,
      message: `Are you sure you want to delete ${notification.label}?`,
      // tslint:disable-next-line: quotemark
      confirmButton: "Yes, I'm sure",
      cancelButton: 'Not really'
    };
    const dialogRef = this.confirmDialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe({
      next: res => {
        if (res) {
          this.januszService.deleteNotification(notification.id).subscribe({
            next: () => {
              this.toastr.success('Notification deleted');
              this.getNotifications();
            },
            error: err => {
              console.error(err);
              this.toastr.error('Notification delete failed');
            }
          });
        }
      }
    });
  }

  /** Messages */

  getMessages(notificationId: number) {
    this.januszService.getMessages(notificationId).subscribe({
      next: (ms: Message[]) => {
        this.messages = ms;
      },
      error: err => {
        console.error(err);
        this.toastr.error('Messages fetch failed');
      }
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

    dialogRef.afterClosed().subscribe({
      next: (val: number) => {
        if (val === 0) {
          this.toastr.error('Message addition failed');
        } else if (val === 1) {
          this.toastr.success('Message added');
          this.getMessages(this.expandedNotification.id);
        }
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

    dialogRef.afterClosed().subscribe({
      next: (val: number) => {
        if (val === 0) {
          this.toastr.error('Message editing failed');
        } else if (val === 1) {
          this.toastr.success('Message edited');
          this.getMessages(this.expandedNotification.id);
        }
      }
    });
  }

  onDeleteMessage(messageId: number) {
    const data: ConfirmationDialogData = {
      title: `Delete message`,
      message: `Are you sure you want to delete this message?`,
      // tslint:disable-next-line: quotemark
      confirmButton: "Yes, I'm sure",
      cancelButton: 'Not really'
    };
    const dialogRef = this.confirmDialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe({
      next: res => {
        if (res) {
          this.januszService.deleteMessage(messageId).subscribe({
            next: () => {
              this.toastr.success('Message deleted');
              this.getMessages(this.expandedNotification.id);
            },
            error: err => {
              console.error(err);
              this.toastr.error('Message deletion failed');
            }
          });
        }
      }
    });
  }
}

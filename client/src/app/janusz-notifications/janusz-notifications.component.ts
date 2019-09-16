import { Component, OnInit } from '@angular/core';

import { Notification, Message } from '../interfaces';
import { JanuszService } from '../janusz.service';

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

  constructor(private januszService: JanuszService) {}

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

  showMessages(notificationId: number) {
    this.januszService
      .getMessages(notificationId)
      .subscribe((ms: Message[]) => {
        console.log(ms);
      });
  }
}

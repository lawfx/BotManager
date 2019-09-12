import { Component, OnInit } from '@angular/core';
import { Notification } from '../interfaces';
import { JanuszService } from '../janusz.service';

@Component({
  selector: 'app-janusz-notifications',
  templateUrl: './janusz-notifications.component.html',
  styleUrls: ['./janusz-notifications.component.css']
})
export class JanuszNotificationsComponent implements OnInit {
  displayedColumns: string[] = ['label', 'workingDay'];
  notifications: Notification[];

  constructor(private januszService: JanuszService) {}

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    this.januszService.getNotifications().subscribe((ns: Notification[]) => {
      this.notifications = ns;
      console.log(this.notifications);
    });
  }
}

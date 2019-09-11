import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class JanuszService {
  constructor(private httpClient: HttpClient) {}

  createNotification(botName: string, notification: Notification) {
    return this.httpClient.put(`/${botName}/notifications`, null, {
      params: {
        name: notification.name,
        author: notification.author
      }
    });
  }

  getNotifications(botName: string) {
    return this.httpClient.get(`/${botName}/notifications`);
  }
}

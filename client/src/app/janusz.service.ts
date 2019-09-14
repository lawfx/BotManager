import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification, Message } from './interfaces';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class JanuszService {
  constructor(private httpClient: HttpClient) {}

  createNotification(notification: Notification, message: Message) {
    return this.httpClient.put(
      '/janusz/notifications',
      {
        notification,
        message
      },
      {
        responseType: 'text'
      }
    );
  }

  getNotifications() {
    return this.httpClient.get('/janusz/notifications');
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification, Message } from './interfaces';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class JanuszService {
  constructor(private httpClient: HttpClient) {}

  getNotifications() {
    return this.httpClient.get('/janusz/notifications');
  }

  createNotification(notification: Notification, message: Message) {
    return this.httpClient.put(
      '/janusz/notifications',
      { notification, message },
      { responseType: 'text' }
    );
  }

  updateNotification(notification: Notification) {
    return this.httpClient.patch(
      `/janusz/notifications/${notification.id}`,
      { notification },
      { responseType: 'text' }
    );
  }

  deleteNotification(notificationId: number) {
    return this.httpClient.delete(`/janusz/notifications/${notificationId}`, {
      responseType: 'text'
    });
  }

  getMessages(notificationId: number) {
    return this.httpClient.get(
      `/janusz/notifications/${notificationId}/messages`
    );
  }

  addMessage(message: Message) {
    return this.httpClient.put(
      `/janusz/messages`,
      { message },
      { responseType: 'text' }
    );
  }

  editMessage(message: Message) {
    return this.httpClient.patch(
      `/janusz/messages/${message.id}`,
      { message },
      { responseType: 'text' }
    );
  }

  deleteMessage(messageId: number) {
    return this.httpClient.delete(`/janusz/messages/${messageId}`, {
      responseType: 'text'
    });
  }
}

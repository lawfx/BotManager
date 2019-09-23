import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification, Message } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class JanuszService {
  constructor(private httpClient: HttpClient) {}

  getNotifications() {
    return this.httpClient.get('/janusz/notifications');
  }

  createNotification(notification: Notification, message: Message) {
    return this.httpClient.put('/janusz/notifications', {
      notification,
      message
    });
  }

  updateNotification(notification: Notification) {
    return this.httpClient.patch(`/janusz/notifications/${notification.id}`, {
      notification
    });
  }

  deleteNotification(notificationId: number) {
    return this.httpClient.delete(`/janusz/notifications/${notificationId}`);
  }

  getMessages(notificationId: number) {
    return this.httpClient.get(
      `/janusz/notifications/${notificationId}/messages`
    );
  }

  addMessage(message: Message) {
    return this.httpClient.put(`/janusz/messages`, { message });
  }

  editMessage(message: Message) {
    return this.httpClient.patch(`/janusz/messages/${message.id}`, { message });
  }

  deleteMessage(messageId: number) {
    return this.httpClient.delete(`/janusz/messages/${messageId}`);
  }
}

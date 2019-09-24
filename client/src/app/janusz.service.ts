import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification, Message, Holiday } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class JanuszService {
  constructor(private httpClient: HttpClient) {}

  /** Notifications */

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

  /** Messages */

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

  /** Holidays */

  getHolidays() {
    return this.httpClient.get('/janusz/holidays');
  }

  addHoliday(holiday: Holiday) {
    return this.httpClient.put('/janusz/holidays', { holiday });
  }

  deleteHoliday(id: number) {
    return this.httpClient.delete(`/janusz/holidays/${id}`);
  }
}

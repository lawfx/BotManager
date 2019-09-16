import schedule from 'node-schedule';

import { Notification } from './models/notification';

export class ScheduledNotification {
  private notification: Notification;
  private messages: string[];
  private job: schedule.Job;

  id: number;

  constructor(notification: Notification, messages: string[]) {
    this.notification = notification;
    this.id = notification.id;
    this.messages = messages;
    this.job = this.createJob();
  }

  private createJob(): schedule.Job {
    console.log(`Creating job for ${this.notification.label}`);
    return schedule.scheduleJob(
      `0 ${this.notification.minute} ${this.notification.hour} ${this.notification.date} ${this.notification.month} ${this.notification.dayOfWeek}`,
      () => {
        console.log(
          this.messages[Math.floor(Math.random() * this.messages.length)]
        );
      }
    );
  }

  cancel() {
    this.job.cancel();
  }

  // TODO make this
  // reschedule() {
  //   this.job.reschedule('');
  // }
}

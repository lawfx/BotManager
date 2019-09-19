import schedule from 'node-schedule';

import { Notification } from './models/notification';
import { Message } from './models/message';

export class ScheduledNotification {
  private notification: Notification;
  private job: schedule.Job;

  id: number;

  constructor(notification: Notification) {
    this.notification = notification;
    this.id = notification.id;
    this.job = this.createJob();
  }

  private createJob(): schedule.Job {
    console.log(`Creating job for ${this.notification.label}`);
    return schedule.scheduleJob(
      `0 ${this.notification.minute} ${this.notification.hour} ${this.notification.date} ${this.notification.month} ${this.notification.dayOfWeek}`,
      () => {
        Message.findAll({ where: { notificationId: this.id } })
          .then((ms: Message[]) => {
            if (ms.length) {
              console.log(ms[Math.floor(Math.random() * ms.length)].message);
            } else {
              console.log(`No messages found for ${this.notification.label}`);
            }
          })
          .catch((err: any) => console.error(err));
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

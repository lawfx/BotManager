import schedule from 'node-schedule';

import { Notification } from './models/notification';
import { Message } from './models/message';
import { Holiday } from './models/holiday';

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
    return schedule.scheduleJob(this.getSchedule(), () => {
      if (this.notification.activeOnHolidays) {
        this.sendMessage();
      } else {
        this.isNotHolidayToday()
          .then(() => {
            this.sendMessage();
          })
          .catch((err: any) => console.error(err));
      }
    });
  }

  reschedule(newNotification: Notification) {
    console.log(`Rescheduling job for ${this.notification.label}`);
    this.notification = newNotification;
    this.job.reschedule(this.getSchedule());
  }

  cancel() {
    console.log(`Canceling job for ${this.notification.label}`);
    this.job.cancel();
  }

  private getSchedule() {
    return `0 ${this.notification.minute} ${this.notification.hour} ${this.notification.date} ${this.notification.month} ${this.notification.dayOfWeek}`;
  }

  private isNotHolidayToday() {
    return new Promise((res, rej) => {
      // TODO fix the where because the db will have date in 0,0,0,0 h/m/s/ms so it should compare to that
      Holiday.findOne({ where: { date: new Date().toISOString() } })
        .then((n: Holiday) => {
          if (n === null) res();
          else rej();
        })
        .catch((err: any) => rej(err));
    });
  }

  private sendMessage() {
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
}

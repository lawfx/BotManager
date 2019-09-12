import path from 'path';
import schedule from 'node-schedule';

import { DiscordBot } from '../discord-bot/discord-bot';
import { Notification } from './models/notification';
import { Message } from './models/message';

// log4js.configure({
//   appenders: {
//     Janusz: { type: 'file', filename: 'janusz.log', maxLogSize: 10485760 }
//   },
//   categories: { default: { appenders: ['Janusz'], level: 'debug' } }
// });

// const logger = log4js.getLogger('Janusz');

export class Janusz extends DiscordBot {
  constructor() {
    super('janusz', __dirname);
    this.setupRoutes();
    let rule = new schedule.RecurrenceRule();
    rule.second = this.convertToRecurrenceSegment('30-45');
    schedule.scheduleJob(rule, () => {
      console.log('firing');
    });
  }

  private setupRoutes() {
    this.router
      .route('/notifications')
      .get((req, res) => {
        Notification.findAll().then((n: Notification[]) => res.send(n));
      })
      .put((req, res) => {
        const notification: Notification = req.body.notification;
        const message: Message = req.body.message;
        Notification.create(notification)
          .then((n: Notification) => {
            message.notificationId = n.id;
            Message.create(message).then(() => res.sendStatus(200));
            return n;
          })
          .then((n: Notification) => {
            // let rule = new schedule.RecurrenceRule();
            // rule.minute = this.convertToRecurrenceSegment('0,15,30-45');
            // schedule.scheduleJob(rule, () => {
            //   console.log('firing');
            // });
          })
          .catch((err: any) => {
            console.error(err);
            res.sendStatus(500);
          });
      });
  }

  private convertToRecurrenceSegment(value: string): schedule.Recurrence[] {
    let segment: schedule.Recurrence[] = [];
    const singles = value.split(',');
    singles.forEach(s => {
      if (s.includes('-')) {
        const range = s.split('-');
        segment.push(new schedule.Range(Number(range[0]), Number(range[1])));
        return;
      }
      segment.push(s);
    });
    console.log(segment);
    return segment;
  }
}

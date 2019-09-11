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
          })
          .catch((err: any) => {
            console.error(err);
            res.sendStatus(500);
          });
      });
  }
}

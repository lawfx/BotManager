import path from 'path';
import schedule from 'node-schedule';

import { DiscordBot } from '../discord-bot/discord-bot';
import { Notification } from './models/notification';

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
    // sequelize.sync({ force: true }).then(() => {
    //   console.log('synced');
    //   Announcement.create({
    //     name: 'breakfast',
    //     author: 'lawfx'
    //   })
    //     .then((a: Announcement) => console.log(a.minute))
    //     .catch((err: any) => console.error(err));
    // });
  }

  private setupRoutes() {
    this.router
      .route('/notifications')
      .get((req, res) => {
        Notification.findAll().then((n: Notification[]) => res.send(n));
      })
      .put((req, res) => {
        console.log(req.query);
        Notification.create({ name: 'test' });
        res.sendStatus(200);
      });
  }
}

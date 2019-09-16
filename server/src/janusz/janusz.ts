import { DiscordBot } from '../discord-bot/discord-bot';
import { Notification } from './models/notification';
import { Message } from './models/message';
import { ScheduledNotification } from './scheduled-notification';

// log4js.configure({
//   appenders: {
//     Janusz: { type: 'file', filename: 'janusz.log', maxLogSize: 10485760 }
//   },
//   categories: { default: { appenders: ['Janusz'], level: 'debug' } }
// });

// const logger = log4js.getLogger('Janusz');

export class Janusz extends DiscordBot {
  private scheduledJobs: ScheduledNotification[] = [];

  constructor() {
    super('janusz', __dirname);
    this.setupRoutes();
    // Message.create({
    //   author: 'nikos',
    //   message: 'Hello from server!',
    //   notificationId: 1
    // });
    this.setupNotifications();
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
      })
      .patch((req, res) => res.sendStatus(200))
      .delete((req, res) => res.sendStatus(200));

    this.router.route('/notifications/:id/messages').get((req, res) =>
      Message.findAll({
        where: { notificationId: req.params.id }
      }).then((ms: Message[]) => {
        res.send(ms);
      })
    );

    this.router
      .route('/messages/:id')
      .patch((req, res) => {})
      .delete((req, res) => {});
  }

  private setupNotifications() {
    Notification.findAll().then((ns: Notification[]) => {
      ns.forEach(n => {
        Message.findAll({ where: { notificationId: n.id } }).then(
          (ms: Message[]) => {
            this.scheduledJobs.push(
              new ScheduledNotification(n, ms.map(m => m.message))
            );
          }
        );
      });
    });
  }
}

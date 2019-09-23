import { DiscordBot } from '../discord-bot/discord-bot';
import { Notification } from './models/notification';
import { Message } from './models/message';
import { ScheduledNotification } from './scheduled-notification';
import { Holiday } from './models/holiday';

// log4js.configure({
//   appenders: {
//     Janusz: { type: 'file', filename: 'janusz.log', maxLogSize: 10485760 }
//   },
//   categories: { default: { appenders: ['Janusz'], level: 'debug' } }
// });

// const logger = log4js.getLogger('Janusz');

export class Janusz extends DiscordBot {
  private scheduledNotifications: ScheduledNotification[] = [];

  constructor() {
    super('janusz', __dirname);
    this.setupRoutes();
    this.setupNotifications();
  }

  private setupRoutes() {
    this.router
      .route('/notifications')
      .get((req, res) => {
        Notification.findAll()
          .then((n: Notification[]) => res.send(n))
          .catch((err: any) =>
            res.status(500).send({ message: 'Database error' })
          );
      })
      .put((req, res) => {
        const notification: Notification = req.body.notification;
        const message: Message = req.body.message;
        Notification.create(notification)
          .then((n: Notification) => {
            message.notificationId = n.id;
            Message.create(message).then(() => res.send({}));
            return n;
          })
          .then((n: Notification) => {
            this.scheduleNotification(n);
          })
          .catch((err: any) => {
            console.error(err);
            res.status(500).send({ message: 'Database error' });
          });
      });

    this.router
      .route('/notifications/:id')
      .patch((req, res) => {
        const notification: Notification = req.body.notification;
        notification.id = Number(req.params.id);
        Notification.update(
          {
            month: notification.month,
            date: notification.date,
            hour: notification.hour,
            minute: notification.minute,
            dayOfWeek: notification.dayOfWeek,
            active: notification.active,
            activeOnHolidays: notification.activeOnHolidays
          },
          {
            where: { id: req.params.id }
          }
        )
          .then(() => {
            this.rescheduleNotification(notification);
            res.send({});
          })
          .catch((err: any) => {
            console.error(err);
            res.status(500).send({ message: 'Database error' });
          });
      })
      .delete((req, res) => {
        Notification.destroy({ where: { id: req.params.id } })
          .then(() => {
            this.cancelNotification(Number(req.params.id));
            res.send({});
          })
          .catch((err: any) => {
            console.error(err);
            res.status(500).send({ message: 'Database error' });
          });
      });

    this.router.route('/notifications/:id/messages').get((req, res) =>
      Message.findAll({
        where: { notificationId: req.params.id }
      })
        .then((ms: Message[]) => {
          res.send(ms);
        })
        .catch((err: any) =>
          res.status(500).send({ message: 'Database error' })
        )
    );

    this.router.route('/messages').put((req, res) => {
      const message: Message = req.body.message;
      Message.create(message)
        .then(() => res.send({}))
        .catch((err: any) => {
          console.error(err);
          res.status(500).send({ message: 'Database error' });
        });
    });

    this.router
      .route('/messages/:id')
      .patch((req, res) => {
        const message: Message = req.body.message;
        Message.update(
          { message: message.message },
          { where: { id: req.params.id } }
        )
          .then(() => res.send({}))
          .catch((err: any) => {
            console.error(err);
            res.status(500).send({ message: 'Database error' });
          });
      })
      .delete((req, res) => {
        Message.destroy({ where: { id: req.params.id } })
          .then(() => res.send({}))
          .catch((err: any) => {
            console.error(err);
            res.status(500).send({ message: 'Database error' });
          });
      });

    this.router
      .route('/holidays')
      .get((req, res) => {
        Holiday.findAll()
          .then((hs: Holiday[]) => res.send(hs))
          .catch((err: any) =>
            res.status(500).send({ message: 'Database error' })
          );
      })
      .put((req, res) => {
        const holiday: Holiday = req.body.holiday;
        Holiday.create(holiday)
          .then(() => {
            res.send({});
          })
          .catch((err: any) => {
            console.error(err);
            res.status(500).send({ message: 'Database error' });
          });
      });

    this.router.route('/holidays/:id').delete((req, res) => {
      Holiday.destroy({ where: { id: req.params.id } })
        .then(() => res.send({}))
        .catch((err: any) => {
          console.error(err);
          res.status(500).send({ message: 'Database error' });
        });
    });
  }

  private setupNotifications() {
    Notification.findAll().then((ns: Notification[]) => {
      ns.forEach(n => {
        this.scheduleNotification(n);
      });
    });
  }

  private getScheduledNotificationById(id: number) {
    return this.scheduledNotifications.find(n => n.id === id);
  }

  private scheduleNotification(n: Notification) {
    if (n.active) {
      this.scheduledNotifications.push(new ScheduledNotification(n));
    }
  }

  private rescheduleNotification(n: Notification) {
    const scheduledNotification = this.getScheduledNotificationById(n.id);
    if (scheduledNotification !== undefined) {
      if (n.active) {
        scheduledNotification.reschedule(n);
      } else {
        this.cancelNotification(n.id);
      }
    } else if (n.active) {
      this.scheduleNotification(n);
    }
  }

  private cancelNotification(id: number) {
    const index = this.scheduledNotifications.findIndex(n => n.id === id);
    if (index === -1) return;
    this.scheduledNotifications[index].cancel();
    this.scheduledNotifications.splice(index, 1);
  }
}

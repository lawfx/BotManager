import path from 'path';
import schedule from 'node-schedule';

import { Bot } from '../discord-bot/discord-bot';

// log4js.configure({
//   appenders: {
//     Janusz: { type: 'file', filename: 'janusz.log', maxLogSize: 10485760 }
//   },
//   categories: { default: { appenders: ['Janusz'], level: 'debug' } }
// });

// const logger = log4js.getLogger('Janusz');

export class Janusz extends Bot {
  constructor() {
    super('janusz', __dirname);
  }
}

// interface Announcement {
//   category: string;
//   author: string;
//   working_day: boolean;
//   year: string;
//   month: string;
//   date: string;
//   week: string;
//   dayOfWeek: string;
//   hour: string;
//   minute: string;
//   second: string;
//   messages: string[];
// }

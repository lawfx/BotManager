import Discord from 'discord.js';
import log4js from 'log4js';
import schedule from 'node-schedule';
import fs from 'fs';
import path from 'path';
import { db } from './database';
import { Router } from 'express';

log4js.configure({
  appenders: {
    Janusz: { type: 'file', filename: 'janusz.log', maxLogSize: 10485760 }
  },
  categories: { default: { appenders: ['Janusz'], level: 'debug' } }
});

const logger = log4js.getLogger('Janusz');

const dataFolder = path.join(__dirname, '../data/janusz');
const config = JSON.parse(
  fs.readFileSync(path.join(dataFolder, 'janusz.config.json'), 'utf-8')
);

const mainChannelName = 'general';

const client = new Discord.Client();
const router = Router();

// const announcements = JSON.parse(fs.readFileSync(path.join(__dirname, dataFolder, "announcements.json"), 'utf-8'));
// announcements.forEach((a : Announcement) => {
//   let rule = new schedule.RecurrenceRule();
//   rule.second = a.second;
//   rule.minute = a.minute;
//   rule.hour = a.hour;
//   rule.date = a.date;
//   rule.month = a.month;
//   rule.year = a.year;
//   rule.dayOfWeek = a.dayOfWeek;
//   schedule.scheduleJob(rule, () => {
//     console.log('The answer to life, the universe, and everything!');
//   });
// });

export function setup() {
  return new Promise((res: (value: Router) => void) => {
    setupRouter();
    setupClientEvents();
    client.login(fs.readFileSync(path.join(dataFolder, 'token.txt'), 'utf-8'));

    process.on('SIGINT', () => {
      logger.info('Caught interrupt signal');
      client.destroy();
    });
    res(router);
  });
}

function setupRouter() {
  router.get('/avatarurl', (req, res) => {
    res.send({ author: config.author, avatarURL: client.user.avatarURL });
  });
}

function setupClientEvents() {
  client.on('error', err => {
    logger.error('Whoah...Error...internet down maybe?', err);
  });

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    logger.info(`Logged in as ${client.user.tag}!`);
  });
}

interface Announcement {
  category: string;
  author: string;
  working_day: boolean;
  year: string;
  month: string;
  date: string;
  week: string;
  dayOfWeek: string;
  hour: string;
  minute: string;
  second: string;
  messages: string[];
}

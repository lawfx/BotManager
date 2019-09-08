import Discord from 'discord.js';
import log4js from 'log4js';
import schedule from 'node-schedule';
import fs from 'fs';
import path from 'path';
import { Router } from 'express';

import { db } from '../database';

log4js.configure({
  appenders: {
    Janusz: { type: 'file', filename: 'janusz.log', maxLogSize: 10485760 }
  },
  categories: { default: { appenders: ['Janusz'], level: 'debug' } }
});

const logger = log4js.getLogger('Janusz');

const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'janusz.config.json'), 'utf-8')
);
const token = fs.readFileSync(path.join(__dirname, 'token.txt'), 'utf-8');

const mainChannelName = 'general';

const client = new Discord.Client();
const router = Router();
let modelAnnouncements;

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
    setupDatabaseTables();
    setupRouter();
    setupClientEvents();
    loginClient();

    process.on('SIGINT', () => {
      logger.info('Caught interrupt signal');
      client.destroy();
    });
    res(router);
  });
}

function setupDatabaseTables() {
  // modelAnnouncements = sequelize.def('Announcements', {});
}

function setupRouter() {
  router.get('/info', (req, res) => {
    if (client.user === null) {
      res.sendStatus(500);
      return;
    }

    res.send({
      author: config.author,
      avatarURL:
        client.user.avatarURL !== null
          ? client.user.avatarURL
          : client.user.defaultAvatarURL,
      uptime: client.uptime,
      status: client.status,
      username: client.user.username,
      description: config.description
    });
  });

  router.put('/shutdown', (req, res) => {
    logger.info('Shutting down client');
    client
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(err => {
        logger.error(err);
        res.status(500).send(err);
      });
  });

  router.put('/restart', (req, res) => {
    logger.info('Restarting client');
    loginClient()
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send(err);
      });
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

function loginClient() {
  return new Promise((res, rej) => {
    client
      .login(token)
      .then(() => res())
      .catch(err => {
        logger.error(err);
        rej(err);
      });
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

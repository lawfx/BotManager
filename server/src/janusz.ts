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

const client = new Discord.Client();

const mainChannelName = 'general';
const dataFolder = '../data/janusz';

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

export const router = Router();
router.get('/avatarurl', (req, res) => {
  res.send(client.user.avatarURL);
});

function setupClientEvents() {
  client.on('error', err => {
    logger.error('Whoah...Error...internet down maybe?', err);
  });

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    logger.info(`Logged in as ${client.user.tag}!`);
  });
}

client.login(
  fs.readFileSync(path.join(__dirname, dataFolder, 'token.txt'), 'utf-8')
);

process.on('SIGINT', () => {
  logger.info('Caught interrupt signal');
  client.destroy();
});

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

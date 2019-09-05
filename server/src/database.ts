import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';

let credentials : DBCredentials = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/db_credentials.json'), 'utf-8'));
console.log(credentials);
export const db = new Sequelize('BotData', credentials.username, credentials.password, {
  dialect: 'sqlite',
  storage: 'bot.db'
}).authenticate().then(() => console.log('Database authenticated!'));

interface DBCredentials{
  username: string,
  password: string
}
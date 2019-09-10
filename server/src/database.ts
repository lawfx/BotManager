import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';

class Database {
  private credentials = {} as Credentials;

  sequelize: Sequelize;

  constructor() {
    this.loadCredentials();

    this.sequelize = new Sequelize(
      'BotData',
      this.credentials.username,
      this.credentials.password,
      {
        dialect: 'sqlite',
        storage: 'bot.db'
        // ,logging: false
      }
    );

    this.sequelize.authenticate();
  }

  private loadCredentials() {
    this.credentials = JSON.parse(
      fs.readFileSync(path.join(__dirname, './db_credentials.json'), 'utf-8')
    );
  }
}

const sequelize = new Database().sequelize;

export { sequelize };

interface Credentials {
  username: string;
  password: string;
}

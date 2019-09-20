import Discord from 'discord.js';
import fs from 'fs';
import path from 'path';
import { Router } from 'express';

export class DiscordBot {
  private name: string;
  private client: Discord.Client;
  private config = {} as Config;
  private token: string = '';
  private basePath: string;

  router: Router;

  constructor(name: string, basePath: string) {
    this.name = name;
    this.basePath = basePath;
    this.client = new Discord.Client();
    this.router = Router();
    this.setupBasicRoutes();
    this.setupBasicDiscordListeners();
    this.loadConfig();
    this.loadToken();
    this.addSystemEventHandlers();
  }

  disconnect() {
    return this.client.destroy();
  }

  connect() {
    return this.client.login(this.token);
  }

  private setupBasicRoutes() {
    this.router.get('/info', (req, res) => {
      if (this.client.user === null) {
        res.sendStatus(500);
        return;
      }

      res.send({
        author: this.config.author,
        avatarURL:
          this.client.user.avatarURL !== null
            ? this.client.user.avatarURL
            : this.client.user.defaultAvatarURL,
        uptime: this.client.uptime,
        status: this.client.status,
        username: this.client.user.username,
        description: this.config.description
      });
    });

    this.router.put('/shutdown', (req, res) => {
      // logger.info('Shutting down client');
      this.disconnect()
        .then(() => res.sendStatus(200))
        .catch(err => {
          // logger.error(err);
          console.error(err);
          res.sendStatus(500);
        });
    });

    this.router.put('/reboot', (req, res) => {
      // logger.info('Restarting client');
      this.disconnect()
        .then(() => res.sendStatus(200))
        .then(() => this.connect())
        .catch(err => {
          console.error(err);
          res.sendStatus(500);
        });
    });
  }

  private setupBasicDiscordListeners() {
    this.client.on('error', err => {
      // logger.error('Whoah...Error...internet down maybe?', err);
      console.error(err);
    });

    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}!`);
      // logger.info(`Logged in as ${client.user.tag}!`);
    });
  }

  private loadConfig() {
    this.config = JSON.parse(
      fs.readFileSync(
        path.join(this.basePath, `${this.name}.config.json`),
        'utf-8'
      )
    );
  }

  private loadToken() {
    this.token = fs.readFileSync(
      path.join(this.basePath, 'token.txt'),
      'utf-8'
    );
  }

  private addSystemEventHandlers() {
    process.on('SIGINT', () => {
      // logger.info('Caught interrupt signal');
      this.client.destroy();
    });
  }
}

interface Config {
  author: string;
  description: string;
}

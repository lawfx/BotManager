import express from 'express';
import path from 'path';

import { Janusz } from './janusz/janusz';
import config from './config.json';
import { sequelize } from './database';
import { Notification } from './janusz/models/notification';
import bodyParser from 'body-parser';

const app = express();
const clientPath = path.join(__dirname, '../../client/dist/client');
const port = config.port;

function setup() {
  app.use(bodyParser.json());

  const januszBot = new Janusz();
  januszBot.connect();
  app.use('/janusz', januszBot.router);

  sequelize.sync({ force: true }).then(() => console.log('Database synced'));
  // Notification.create({ name: 'breakfast', author: 'lawfx' });
  app.use(express.static(clientPath));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });

  app.listen(port, () => console.log(`Server running in port ${port}`));
}

setup();

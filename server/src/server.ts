import express from 'express';
import path from 'path';
import { Janusz } from './janusz/janusz';
import config from './config.json';

const app = express();
const clientPath = path.join(__dirname, '../../client/dist/client');
const port = config.port;

function setup() {
  app.use(express.static(clientPath));

  const januszBot = new Janusz();
  januszBot.connect();
  app.use('/janusz', januszBot.router);

  app.get('/*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });

  app.listen(port, () => console.log(`Server running in port ${port}`));
}

setup();

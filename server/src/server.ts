import express from 'express';
import path from 'path';
import { setup as JanuszSetup } from './janusz/janusz';

const app = express();
const clientPath = path.join(__dirname, '../../client/dist/client');
const port = 9000;

function setup() {
  app.use(express.static(clientPath));

  JanuszSetup()
    .then((router: express.Router) => app.use('/janusz', router))
    .then(() => {
      //TODO redalert setup
    })
    .then(() => {
      app.get('/*', (req, res) => {
        res.sendFile(path.join(clientPath, 'index.html'));
      });

      app.listen(port, () => console.log(`Server running in port ${port}`));
    });
}

setup();

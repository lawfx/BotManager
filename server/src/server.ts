import express from 'express';
import path from 'path';
import { router } from './janusz';

const app = express();

app.use(express.static(path.join(__dirname, '../../client/dist/client/')));
app.use('/janusz', router);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/client/index.html'));
});

app.listen(9000, () => console.log('Server running in port 9000'));

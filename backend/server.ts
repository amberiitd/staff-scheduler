require('dotenv').config(); // load .env file at the topmost

import router from './src/routes/schedule'
import express from 'express';
import bodyParser from 'body-parser'

const app = express();
app.use(bodyParser.json());

app.use('/schedule', router);

// 404 Resource Not Found handler
app.use((req, res) => {
  res.status(404).json({ error: 'Resource Not Found' });
});

app.listen(8080)

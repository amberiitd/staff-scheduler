require('dotenv').config(); // load .env file at the topmost

import scheduleRouter from './src/routes/schedule'
import userRouter  from './src/routes/user'
import analyticsRouter  from './src/routes/anaytics'
import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express();
app.use(bodyParser.json());
app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  origin: '*'
}))

app.get('/health-check', (req, res) => {
  res.status(200).json({status: 200})
})

app.use('/schedule', scheduleRouter);
app.use('/user', userRouter);
app.use('/analytics', analyticsRouter);

// 404 Resource Not Found handler
app.use((req, res) => {
  res.status(404).json({ error: 'Resource Not Found update 2' });
});

app.listen(8080)

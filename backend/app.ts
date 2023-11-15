import express, { Express, Request, Response } from 'express';
import Colors = require('colors.ts');
import dotenv from 'dotenv';
import errorHandler from './src/middleware/error';
dotenv.config();

import db from './src/models';

Colors.enable();

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running');
});

const connectSequelize = async () => {
  try {
    await db.sequelize.authenticate()
    console.log('Connection has been established successfully.'.green);
  } catch (err) {
    console.error('Unable to connect to the database: ', err);
  }
}

connectSequelize();

db.sequelize.sync().then(() => {
  console.log('tables created successfully')
}).catch((err: Error) => {
  console.error('Unable to create database tables: ', err);
})

app.use(errorHandler);

export default app

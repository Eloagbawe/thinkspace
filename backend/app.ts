import express, { Express, Request, Response } from 'express';
import Colors = require('colors.ts');
import dotenv from 'dotenv';
dotenv.config();

import sequelizeConnection from './src/config/db';

Colors.enable();

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running');
});

const connectSequelize = async () => {
  try {
    await sequelizeConnection.authenticate()
    console.log('Connection has been established successfully.'.green);
  } catch (err) {
    console.error('Unable to connect to the database: ', err);
  }
}

connectSequelize();
export default app

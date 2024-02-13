/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Express } from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import Colors = require('colors.ts');
import dotenv from 'dotenv';
dotenv.config();
import errorHandler from './src/middleware/error';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import db from './src/models';
import router from './src/routes'
import { cloudinaryConfig } from './src/config/cloudinaryConfig';
require ('./src/config/passport');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

Colors.enable();
cloudinaryConfig();

const app: Express = express();

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

/* eslint-disable @typescript-eslint/no-explicit-any */

io.on('connect', (socket: any) => {
  console.log(`⚡: ${socket.id} user just connected`);

  socket.on('notification', (data: any) => {
    console.log(data)
  })

  socket.on('disconnect', () => {
  });
})

app.set('io', io);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

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


const sessionStore = new SequelizeStore({
  db: db.sequelize,
  checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
  expiration: 24 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
})

app.use( session({
    secret: process.env.SESSION_SECRET as string,
    store: sessionStore,
    resave: false,
    saveUninitialized:true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

sessionStore.sync();

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/users', router.authRouter);
app.use('/api/v1/users', router.userRouter);
app.use('/api/v1/blogs', router.blogRouter);
app.use('/api/v1/categories', router.blogCategoryRouter);
app.use('/api/v1/comments', router.commentRouter);
app.use('/api/v1/replies', router.replyRouter);

app.use(errorHandler);

export default httpServer;

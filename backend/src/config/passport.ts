/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import db from "../models";
import { passwordUtils } from "../utils";
import { UserAttributes } from "../interfaces";

const customFields = {
  usernameField: 'email',
}

const verifyCallback = async (email: string, password: string, done: (error: Error | null, user?: Express.User | UserAttributes | false, options?: {message: string}) => void)  => {
  try {
    const user = await db.User.findOne({ where: { email }});

    if (!user){
      return done(null, false, { message: 'User not found' }) ;
    }
    const passVal = passwordUtils.validPassword(password, user.password);
    
    if(!passVal){
      return done(null, false, { message: 'Incorrect password' });
    }

    const userOutput = user.toJSON();
    delete userOutput.password

    return done(null, userOutput);

  } catch(err: any) {
      return done(err)
  }
}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user: UserAttributes, done: (err: Error | null, id?: string) => void ) => {
  done(null, user.id);
});

passport.deserializeUser((userId: string, done: (err: any, user?: false | UserAttributes | null | undefined) => void) => {
  db.User.findByPk(userId, {attributes: { exclude: ['password']},
  include: [ { model: db.Blog }, { model: db.Comment }] })
    .then((user: UserAttributes) => {
      done(null, user);
    })
    .catch((err: Error) => done(err));
});

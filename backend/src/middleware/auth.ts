import type { Request, Response, NextFunction } from "express";
import passport from 'passport';
import { UserAttributes } from "../interfaces";

export const passportAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: Error, user: UserAttributes, info: { message: string; } | undefined) => {
    if (err) { 
      return next(err);
    }
    if (!user) { 
      res.status(401);
      throw new Error(info?.message)
    }
    req.login(user, function(err){
      if(err){
        return next(err);
      }
      next()
    });
  })(req, res, next);
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({message: 'You are not authorized to view this resource'})
  }
}

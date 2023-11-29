import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import db from "../models";
import { genPassword } from '../utils/passwordUtils';

const signUp = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({message: "Username, email and password is required"})
  }

  const userExists = await db.User.findOne({where: { email}});

  if (userExists) {
    res.status(400);
    throw new Error('User with the same email already exists')
  }

  try {
    const hashedPassword = genPassword(password);
    const user = await db.User.create({username, email, password: hashedPassword});
    req.login(user, (err) => {
      if (err) {
        res.status(500)
        throw new Error('A network error occurred')
      }
      const userOutput = user.toJSON();
      delete userOutput.password

      res.status(201).json({success: true, message: 'user created successfully', user: userOutput});
    })
  } catch (err) {
    res.status(500)
    throw new Error('A network error occurred')
  }
})

const login = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).send({message: 'Login Successful', user: req.user})
})

const logout = asyncHandler(async (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      res.status(500)
      throw new Error('A network error occurred')
    } else {
      res.status(200).send({success: true, message: 'Log Out Successful'})
    }
  });
})

export default { signUp, login, logout };

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import db from "../models";
import { UserAttributes } from '../interfaces';

const getMe = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({user: req.user})
});

const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const {first_name, last_name, username} = req.body

  const fieldsToUpdate = {first_name, last_name, username}

  try {
    const loggedInUser: UserAttributes | undefined = req.user;
    await db.User.update(fieldsToUpdate, {
      where: {
        id: loggedInUser?.id
      }
    });
    res.status(200).json({message: 'user details updated successfully'});
  } catch (err) {
    res.status(500)
    throw new Error("Error updating details")
  }
})

const deleteUser = asyncHandler(async (req: Request, res: Response) => {

  try {
    const loggedInUser: UserAttributes | undefined = req.user;

    await db.User.destroy({
      where: {
        id: loggedInUser?.id
      }
    })

    req.logout((err) => {
      if (err) {
        res.status(500)
        throw new Error('A network error occurred')
      } else {
        res.status(204).send()
      }
    });

  } catch (err) {
    res.status(500)
    throw new Error("Error deleting user")
  }

})

export const userController = { getMe, updateProfile, deleteUser };

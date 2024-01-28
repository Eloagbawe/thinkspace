import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import db from "../models";
import { UserAttributes } from '../interfaces';
import { uploader } from '../config/cloudinaryConfig';
import { bufferToDataURI } from '../utils';

const getMe = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({user: req.user});
});

const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const {first_name, last_name, username} = req.body;

  const fieldsToUpdate: UserAttributes = {first_name, last_name, username};

  const loggedInUser: UserAttributes | undefined = req.user;

  const files = req.files as Express.Multer.File[];

  const profile_picture = files?.find((file: Express.Multer.File) => file.fieldname === 'profile_picture');

  if (profile_picture) {
    const { fieldname, mimetype, buffer } = profile_picture;
    const fileFormat = mimetype.split('/')[1];
    const fileData = bufferToDataURI(`.${fileFormat}`, buffer).content;
    try {
      const result = await uploader.upload(fileData!,
      { public_id: `${process.env.CLOUDINARY_FOLDER_NAME}/${loggedInUser?.email}_${fieldname}`});
      fieldsToUpdate.profile_picture_url = result.url;

      } catch (err) {
        res.status(400);
        throw new Error("Error uploading profile picture");
      }
  }

  try {
    await db.User.update(fieldsToUpdate, {
      where: {
        id: loggedInUser?.id
      }
    });
    res.status(200).json({message: 'user details updated successfully'});
  } catch (err) {
    res.status(500);
    throw new Error("Error updating details");
  }

})

const deleteUser = asyncHandler(async (req: Request, res: Response) => {

  try {
    const loggedInUser: UserAttributes | undefined = req.user;

    await db.User.destroy({
      where: {
        id: loggedInUser?.id
      }
    });

    req.logout((err) => {
      if (err) {
        res.status(500);
        throw new Error('A network error occurred');
      } else {
        res.status(204).send();
      }
    });

  } catch (err) {
    res.status(500);
    throw new Error("Error deleting user");
  }

})

export const userController = { getMe, updateProfile, deleteUser };

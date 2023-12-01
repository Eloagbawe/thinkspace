import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import db from "../models";
import { UserAttributes } from '../interfaces';

const createBlog = asyncHandler(async (req: Request, res: Response) => {
  const {title, content} = req.body;

  if (!title || !content) {
    res.status(400)
    throw new Error('Please provide a title and a content')
  }

  try {
    const user: UserAttributes | undefined = req.user;
    const newBlog = await db.Blog.create({title, content, UserId: user?.id})

    res.status(201).json({success: true, message: 'Blog created successfully', blog: newBlog});

  } catch (err) {
    res.status(500)
    throw new Error("Error creating a blog")
  }
})

const getBlogs = asyncHandler(async(req: Request, res: Response) => {
  try {
    const blogs = await db.Blog.findAll({ 
      include: [ 
        { model: db.User, attributes: { exclude: ['password']} } 
      ]
    });
    res.status(200).json({success: true, blogs});
  } catch (err) {
    res.status(500)
    console.log(err)
    throw new Error("Error fetching blogs")
  }
})

const getUserBlogs = asyncHandler(async(req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400)
    throw new Error("Please provide user id")
  }
  try {
    const blogs = await db.Blog.findAll({where: { UserId: id },
      include: [ 
        { model: db.User, attributes: { exclude: ['password']} } 
      ]
    });
    res.status(200).json({success: true, blogs});
  } catch (err) {
    res.status(500)
    throw new Error("Error fetching user blogs")
  }
})

const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const {title, content} = req.body

  if (!id) {
    res.status(400)
    throw new Error("Please provide blog id")
  }

  const blog = await db.Blog.findOne({id});

  if (!blog) {
    res.status(404)
    throw new Error("Blog not found")
  }
  const loggedInUser: UserAttributes | undefined = req.user;

  if (blog.UserId !== loggedInUser?.id) {
    res.status(401)
    throw new Error("Not authorized")
  }

  try {
    const fieldsToUpdate = {title, content};
    await db.Blog.update(fieldsToUpdate, {
      where: {
        id: loggedInUser?.id
      }
    });
    res.status(200).json({message: 'blog updated successfully'});
  } catch (err) {
    res.status(500)
    throw new Error("Error updating blog")
  }

})

export const blogController = { createBlog, getBlogs, getUserBlogs, updateBlog }

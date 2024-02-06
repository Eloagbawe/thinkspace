import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import db from "../models";
import { UserAttributes } from '../interfaces';
import { getPageInfo } from '../utils';

const createBlog = asyncHandler(async (req: Request, res: Response) => {
  const { title, content, categoryId } = req.body;

  if (!title || !content) {
    res.status(400)
    throw new Error('Please provide a title and a content')
  }

  if (!categoryId) {
    res.status(400)
    throw new Error("Please provide a blog category")
  }

  const blogCategory = await db.BlogCategory.findOne({
    where: { id: categoryId }
  });

  if (!blogCategory) {
    res.status(404)
    throw new Error("Blog category not found")
  }

  try {
    const user: UserAttributes | undefined = req.user;
    const newBlog = await db.Blog.create({title, content, UserId: user?.id,
      BlogCategoryId: blogCategory?.id })

    res.status(201).json({success: true, message: 'Blog created successfully', blog: newBlog});

  } catch (err) {
    res.status(500)
    throw new Error("Error creating a blog")
  }
})

const getBlogs = asyncHandler(async(req: Request, res: Response) => {

  const { page=1, limit=10 } = req.query;

  const parsedLimit = parseInt(limit as string);
  const parsedPage = parseInt(page as string);

  if (!parsedPage) {
    res.status(400)
    throw new Error('page must be a number')
  }

  if (!parsedLimit) {
    res.status(400)
    throw new Error('limit must be a number')
  }

  try {
    const data = await db.Blog.findAndCountAll({ 
      include: [ 
        { model: db.User, attributes: { exclude: ['password']} } 
      ],
      order: [
        ['createdAt', 'DESC'],
      ],
      parsedLimit,
      offset: ((parsedPage - 1) * parsedLimit)
    });

    const { count, rows } = data;

    const pageInfo = getPageInfo(count, parsedLimit, parsedPage);

    res.status(200).json({success: true, blogs: rows, pageInfo});
  } catch (err) {
    res.status(500)
    console.log(err)
    throw new Error("Error fetching blogs")
  }
})

const getBlog = asyncHandler(async(req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const blog = await db.Blog.findOne({
      where: id,
      include: [ 
        { model: db.User, attributes: { exclude: ['password']} },
        { model: db.Comment }
      ]
    });
    res.status(200).json({success: true, blog});

  } catch (err) {
    res.status(500)
    console.log(err)
    throw new Error("Error fetching blog")
  }
})

const getUserBlogs = asyncHandler(async(req: Request, res: Response) => {
  const { id } = req.params;

  const { page=1, limit=10 } = req.query;

  const parsedLimit = parseInt(limit as string);
  const parsedPage = parseInt(page as string);

  if (!parsedPage) {
    res.status(400)
    throw new Error('page must be a number')
  }

  if (!parsedLimit) {
    res.status(400)
    throw new Error('limit must be a number')
  }

  if (!id) {
    res.status(400)
    throw new Error("Please provide user id")
  }
  try {
    const data = await db.Blog.findAndCountAll({where: { UserId: id },
      include: [ 
        { model: db.User, attributes: { exclude: ['password']} } 
      ],
      order: [
        ['createdAt', 'DESC'],
      ],
      parsedLimit,
      offset: ((parsedPage - 1) * parsedLimit)
    });

    const { count, rows } = data

    const pageInfo = getPageInfo(count, parsedLimit, parsedPage)

    res.status(200).json({success: true, blogs: rows, pageInfo});
  } catch (err) {
    res.status(500)
    throw new Error("Error fetching user blogs")
  }
})

const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, categoryId } = req.body

  if (!id) {
    res.status(400)
    throw new Error("Please provide blog id")
  }

  const blog = await db.Blog.findOne({
    where: { id }
  });

  if (!blog) {
    res.status(404)
    throw new Error("Blog not found")
  }

  if (categoryId) {
    const blogCategory = await db.BlogCategory.findOne({
      where: { id: categoryId }
    });
  
    if (!blogCategory) {
      res.status(404)
      throw new Error("Blog category not found")
    }
  }

  const loggedInUser: UserAttributes | undefined = req.user;

  if (blog.UserId !== loggedInUser?.id) {
    res.status(401)
    throw new Error("Not authorized")
  }

  try {
    const fieldsToUpdate = {title, content, BlogCategoryId: categoryId};
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

const deleteBlog = asyncHandler(async(req: Request, res: Response) => {
  const { id } = req.params;

  const blog = await db.Blog.findOne({ 
    where: { id }
    });

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
    await db.Blog.destroy({
      where: {
        id: blog.id
      }
    })
    res.status(204).send()
  } catch (err) {
    res.status(500)
    throw new Error("Error deleting blog")
  }

})

export const blogController = { createBlog, getBlogs, getBlog, getUserBlogs, updateBlog, deleteBlog }

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import db from "../models";

const addCategory = asyncHandler(async(req: Request, res: Response) => {
  const { name, key } = req.body;

  if(!name) {
    res.status(400)
    throw new Error('Please provide a category name')
  }

  if(!key || key !== process.env.ADMIN_KEY) {
    res.status(401)
    throw new Error('Please provide a valid admin key')
  }

  const categoryExists = await db.BlogCategory.findOne({where: { name }});

  if (categoryExists) {
    res.status(400);
    throw new Error('Blog Category with the same name already exists')
  }

  try {
    const newCategory = await db.BlogCategory.create({name})
    res.status(201).json({success: true, message: 'Blog category created successfully', category: newCategory})
  } catch (err) {
    res.status(500)
    throw new Error("Error creating a blog category")
  }
})

const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await db.BlogCategory.findAll()
  res.status(200).json({success: true, categories})
})

const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name, key } = req.body
  const { id } = req.params

  if(!name) {
    res.status(400)
    throw new Error('Please provide a category name')
  }

  if(!key || key !== process.env.ADMIN_KEY) {
    res.status(401)
    throw new Error('Please provide a valid admin key')
  }

  const category = await db.BlogCategory.findOne({
    where: {
      id
    }
  })

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  try {
    await db.BlogCategory.update({name}, {
      where: {
        id
      }
    })
    res.status(200).json({message: 'blog category updated successfully'});
  } catch (err) {
    res.status(500)
    throw new Error("Error updating blog category")
  }
})

const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const { key } = req.body
  const { id } = req.params

  if(!key || key !== process.env.ADMIN_KEY) {
    res.status(401)
    throw new Error('Please provide a valid admin key')
  }

  const category = await db.BlogCategory.findOne({
    where: {
      id
    }
  })

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  try {
    await db.BlogCategory.destroy({
      where: {
        id
      }
    })
    res.status(204).send();
  } catch (err) {
    res.status(500)
    throw new Error("Error deleting blog category")
  }
})

export const blogCategoryController = { addCategory, getCategories, updateCategory, deleteCategory }

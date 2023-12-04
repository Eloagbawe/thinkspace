import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import db from "../models";
import { UserAttributes } from '../interfaces';

const addComment = asyncHandler(async(req: Request, res: Response) => {
  const { blogId } = req.params;
  const { content } = req.body;

  if (!blogId) {
    res.status(400);
    throw new Error("Please provide Blog Id")
  }
  const blog = await db.Blog.findOne({ 
    where: { id: blogId }
  });

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  if(!content) {
    res.status(400);
    throw new Error("Please provide comment content");
  }

  try {
    const user: UserAttributes | undefined = req.user;

    const newComment = await db.Comment.create({ content, BlogId: blog.id, UserId: user?.id})

    res.status(201).json({success: true, message: 'Comment added successfully', comment: newComment});

  } catch (err) {
    res.status(500)
    throw new Error("Error adding a comment")
  }

});

const getComments = asyncHandler(async (req: Request, res: Response) => {
  const { blogId } = req.params;

  if (!blogId) {
    res.status(400);
    throw new Error("Please provide Blog Id")
  }

  const blog = await db.Blog.findOne({ 
    where: { id: blogId }
  });

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  try {
    const comments = await db.Comment.findAll({
      where: {
        id: blogId
      }
    })

    res.status(200).json({success: true, comments});

  } catch (err) {
    res.status(500)
    throw new Error("Error fetching comments")
  }

})

const updateComment = asyncHandler(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { content } = req.body;

  if (!commentId) {
    res.status(400)
    throw new Error("Please provide comment id")
  }

  const comment = await db.Comment.findOne({
    where: { id: commentId }
  });

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  const user: UserAttributes | undefined = req.user;

  if (user?.id !== comment.UserId) {
    res.status(401);
    throw new Error("Not authorized")
  }

  try {

    await db.Comment.update({content}, {
      where: {
        id: commentId
      }
    })

    res.status(200).json({message: 'comment updated successfully'});

  } catch(err) {
    res.status(500)
    throw new Error("Error updating comment")
  }
})

const deleteComment = asyncHandler(async (req: Request, res: Response) => {
  const { commentId } = req.params;

  if (!commentId) {
    res.status(400)
    throw new Error("Please provide comment id")
  }

  const comment = await db.Comment.findOne({
    where: { id: commentId }
  });

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  const user: UserAttributes | undefined = req.user;

  if (user?.id !== comment.UserId) {
    res.status(401);
    throw new Error("Not authorized")
  }

  try {

    await db.Comment.destroy({
      where: {
        id: commentId
      }
    })

    res.status(204).send();

  } catch(err) {
    res.status(500)
    throw new Error("Error deleting comment")
  }
})

export const commentController = { addComment, getComments, updateComment, deleteComment }

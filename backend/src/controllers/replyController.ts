import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import db from "../models";
import { UserAttributes } from '../interfaces';

const addReply = asyncHandler(async (req: Request, res: Response) => {
  const  { commentId } = req.params;
  const { content } = req.body;


  if (!commentId) {
    res.status(400);
    throw new Error('Please provide comment id')
  }

  const comment = await db.Comment.findOne({
    where: { id: commentId }
  });

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  if(!content) {
    res.status(400);
    throw new Error("Please provide reply content");
  }
  const user: UserAttributes | undefined = req.user;

  try {
    const newReply = await db.Reply.create({content, CommentId: comment.id, UserId: user?.id})
    res.status(201).json({success: true, message: 'Reply added successfully', reply: newReply});

  } catch(err) {
    throw new Error('Error adding a new reply')

  }

});

const getReplies = asyncHandler(async (req: Request, res: Response) => {
  const  { commentId } = req.params;

  if (!commentId) {
    res.status(400);
    throw new Error('Please provide comment id')
  }

  const comment = await db.Comment.findOne({
    where: { id: commentId }
  });

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  try {
    const replies = await db.Reply.findAll({
      where: {
        CommentId: commentId
      },
      include: [
        { model: db.User, attributes: { exclude: ['password']} },
      ]
    })
    res.status(200).json({success: true, replies});

  } catch(err) {
    throw new Error('Error fetching replies');

  }
});

export const replyController = { addReply, getReplies };

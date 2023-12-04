import express from 'express';
import { isAuth } from '../middleware/auth';
import { commentController } from '../controllers';

const router = express.Router();

router.post('/comments/:blogId', isAuth, commentController.addComment);
router.get('/:blogId/comments', commentController.getComments);
router.put('/comments/:commentId', commentController.updateComment);
router.delete('/comments/:commentId', commentController.deleteComment);

export default router;

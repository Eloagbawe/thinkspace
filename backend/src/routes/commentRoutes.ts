import express from 'express';
import { isAuth } from '../middleware/auth';
import { commentController } from '../controllers';

const router = express.Router();

router.post('/:blogId', isAuth, commentController.addComment);
router.get('/:blogId', commentController.getComments);
router.put('/:commentId', commentController.updateComment);
router.delete('/:commentId', commentController.deleteComment);

export default router;

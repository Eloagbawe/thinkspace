import express from 'express';
import { isAuth } from '../middleware/auth';
import { replyController } from '../controllers';

const router = express.Router();

router.post('/:commentId', isAuth, replyController.addReply);
router.get('/:commentId',  replyController.getReplies);

export default router;

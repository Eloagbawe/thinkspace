import express from 'express';
import { isAuth } from '../middleware/auth';
import { blogController } from '../controllers';

const router = express.Router();

router.post('/', isAuth, blogController.createBlog);
router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getUserBlogs);

export default router;

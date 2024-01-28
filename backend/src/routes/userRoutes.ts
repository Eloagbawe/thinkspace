import express from 'express';
import { isAuth } from '../middleware/auth';
import { userController } from '../controllers';
import { upload } from '../middleware/imageUpload';

const router = express.Router();

router.get('/me', isAuth, userController.getMe);
router.put('/update', [isAuth, upload], userController.updateProfile);
router.delete('/me', isAuth, userController.deleteUser);

export default router;

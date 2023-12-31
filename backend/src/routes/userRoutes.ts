import express from 'express';
import { isAuth } from '../middleware/auth';
import { userController } from '../controllers';

const router = express.Router();

router.get('/me', isAuth, userController.getMe);
router.put('/update', isAuth, userController.updateProfile);
router.delete('/me', isAuth, userController.deleteUser);

export default router;

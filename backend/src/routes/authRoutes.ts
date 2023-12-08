import express from 'express';
import { authController } from '../controllers';
import { passportAuth } from '../middleware/auth';

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', passportAuth, authController.login);
router.post('/logout', authController.logout)

export default router;

import { Router } from 'express';
import { loginController } from '../controllers/loginController.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', loginController.login);
router.post('/logout', authMiddleware, loginController.logout);
router.get('/verify', loginController.verifyToken);

export default router;
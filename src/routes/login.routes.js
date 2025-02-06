import { Router } from 'express';
import { loginController } from '../controllers/loginController.js';

const router = Router();

router.post('/login', loginController.login);

export default router;
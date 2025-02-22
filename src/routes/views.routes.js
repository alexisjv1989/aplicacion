import { Router } from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

// Ruta para la página de chat
router.get('/chat', (req, res) => {
    res.sendFile(join(__dirname, '../../public/chat.html'));
});

// Ruta para la página de login
router.get('/login', (req, res) => {
    res.sendFile(join(__dirname, '../../public/login.html'));
});

// Ruta raíz que redirige al chat
router.get('/', (req, res) => {
    res.redirect('/chat');
});

export default router;
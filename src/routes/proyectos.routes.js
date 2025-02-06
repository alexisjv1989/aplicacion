import { Router } from 'express';
import { obtenerProyectos, crearProyecto } from '../controllers/proyectosController.js';

const router = Router();

router.get('/proyectos', obtenerProyectos);
router.post('/proyectos', crearProyecto);

export default router;
import { Router } from 'express';
import {obtenerTareas, crearTarea} from '../controllers/tareasController.js';

const router = Router();

router.get('/tareas', obtenerTareas);
router.post('/tareas', crearTarea);


export default router;
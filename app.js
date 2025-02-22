import express from 'express';
import routerProyectos from './src/routes/proyectos.routes.js';
import routerUsers from './src/routes/users.routes.js';
import routerLogin from './src/routes/login.routes.js';
import routerViews from './src/routes/views.routes.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { configureMiddlewares } from './src/middlewares/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Middlewares
configureMiddlewares(app);

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')));

// Rutas
app.use(express.json());
app.use(routerProyectos);
app.use("/users", routerUsers);
app.use('/', routerViews);
app.use(routerLogin);

export default app;
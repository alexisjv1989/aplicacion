import express from 'express';
import routerProyectos from './src/routes/proyectos.routes.js';
import routerUsers from './src/routes/users.routes.js';
import routerLogin from './src/routes/login.routes.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
 
const app = express();

//middlewares
app.use(express.json());
app.use(routerProyectos);
app.use("/users", routerUsers);
app.use(routerLogin);

export default app;
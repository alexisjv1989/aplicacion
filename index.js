import app from './app.js';
import { sequelize } from "./src/database/db.js";
import './src/models/Proyectos.js';
import './src/models/Tareas.js';
import './src/models/Users.js';

const main = async () => {
    try {
        //await sequelize.sync({ force : true });
        console.log('Conexión establecida correctamente.');
        app.listen(3000, () => {
            console.log('Servidor corriendo en el puerto 3000sss');
        });
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }

};
main();
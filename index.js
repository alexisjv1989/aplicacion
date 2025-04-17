import app from './app.js';
import { sequelize } from "./src/database/db.js";
import './src/models/Proyectos.js';
import './src/models/Tareas.js';
import './src/models/Users.js';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { MessageHandler } from './src/sockets/messageHandler.js';

// 1. Crear el servidor HTTP
const server = createServer(app);

// 2. Configurar Socket.io
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// 3. Configurar el manejador de mensajes
const messageHandler = new MessageHandler(io);
messageHandler.initialize();

const main = async () => {
    try {
        await sequelize.sync();
        console.log('Conexión a la base de datos establecida correctamente.');
        
        // 4. Iniciar el servidor HTTP (que incluye Socket.io)
        server.listen(3000, () => {
            console.log('Servidor HTTP y Socket.io corriendo en puerto 3000 jenkins');
        });
    } catch (error) {
        console.error('Error de conexión:', error);
    }
};

main();

// Exportar io para usarlo en otros archivos si es necesario
export { io };

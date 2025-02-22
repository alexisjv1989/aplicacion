// src/sockets/messageHandler.js
import jwt from 'jsonwebtoken';

export class MessageHandler {
    constructor(io) {
        this.io = io;
        this.connectedUsers = new Map();
    }

    initialize() {
        this.io.use((socket, next) => {
            try {
                const token = socket.handshake.auth.token;
                if (!token) {
                    return next(new Error('Token no proporcionado'));
                }

                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                socket.user = decoded;
                next();
            } catch (error) {
                next(new Error('Authentication error'));
            }
        });

        this.io.on('connection', (socket) => {
            const userId = socket.user.id;
            
            // Guardar usuario conectado
            this.connectedUsers.set(userId, {
                socket: socket,
                user: socket.user
            });

            // Enviar mensaje de bienvenida
            socket.emit('welcome', {
                user: socket.user
            });

            // Notificar a todos los usuarios
            this.io.emit('user_connected', {
                userId: userId,
                nombre: socket.user.nombre
            });

            // Manejar mensajes
            socket.on('send_message', (data) => {
                console.log('Mensaje recibido:', data);
                
                // Emitir a todos excepto al remitente
                socket.broadcast.emit('new_message', {
                    from: socket.user.nombre,
                    message: data.message,
                    fromSelf: false
                });
            });

            // Manejar desconexión
            socket.on('disconnect', () => {
                this.connectedUsers.delete(userId);
                this.io.emit('user_disconnected', {
                    userId: userId,
                    nombre: socket.user.nombre
                });
            });
        });
    }
}
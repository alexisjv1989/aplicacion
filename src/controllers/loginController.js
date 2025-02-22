import bcrypt from 'bcryptjs';
import { User } from '../models/Users.js';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    try {
        const { nombre, password } = req.body;
        
        // Buscar usuario
        const user = await User.findOne({ where: { nombre } });
        if (!user) {
            return res.status(404).json({ message: 'El usuario no ha sido encontrado' });
        }

        // Verificar password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ message: 'La password no son correctas' });
        }

        // Generar token
        const token = jwt.sign(
            { id: user.id, nombre: user.nombre },
            process.env.JWT_SECRET,
            { expiresIn: "4h" }
        );

        // Establecer cookie para el token (opcional, pero recomendado)
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 4 * 60 * 60 * 1000 // 4 horas en milisegundos
        });

        res.status(200).json({ user, token });
    } catch (error) {
        console.log({ message: error.message });
        return res.status(500).json({ message: error.message });
    }
};

// Agregar logout
const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Sesión cerrada correctamente' });
    } catch (error) {
        console.log({ message: error.message });
        return res.status(500).json({ message: error.message });
    }
};

// Verificar token
const verifyToken = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No hay token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { id: decoded.id } });
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.log({ message: error.message });
        return res.status(401).json({ message: 'Token inválido' });
    }
};

export const loginController = {
    login,
    logout,
    verifyToken
};
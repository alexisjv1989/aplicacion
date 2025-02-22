import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const configureMiddlewares = (app) => {
    // Middlewares básicos
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    // Archivos estáticos
    app.use(express.static(join(__dirname, '../../public')));
};

export default configureMiddlewares;
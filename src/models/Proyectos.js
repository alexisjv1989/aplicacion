import {DataTypes} from 'sequelize';
import {sequelize} from '../database/db.js';
import {Tarea} from './Tareas.js';


//definir el modelo de la tabla
export const Proyecto = sequelize.define('proyectos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
});

Proyecto.hasMany(Tarea, {
    foreignKey: 'proyectoId',
    sourceKey: 'id'
});

Tarea.belongsTo(Proyecto, {
    foreignKey: 'proyectoId',
    target_id: 'id',
});

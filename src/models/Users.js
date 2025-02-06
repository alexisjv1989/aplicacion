import { Sequelize } from "sequelize";
import { sequelize } from "../database/db.js";
import bcript from 'bcryptjs';

export const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }

    
});

User.beforeCreate(async (user) => {
    user.password = await bcript.hash(user.password, 8);
});


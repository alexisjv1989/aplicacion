import { User } from '../models/Users.js';
import jwt from 'jsonwebtoken';


const register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;   
        //creamos al usuario
        const newUser = await User.create({ nombre, email, password });
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ newUser, token})
    } catch (error) {
        console.log({error});
        return res.status(500).json({ message: error });
    }   
};

const login = async (req, res) => {
    try {
        return res.json({ message: 'probando login' });
    } catch (error) {
        console.log({ message: error.message});
        return res.status(500).json({ message: error.message });
    }
};

export const userController = {
    register, login
};
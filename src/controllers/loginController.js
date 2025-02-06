import { User } from '../models/Users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const login = async (req, res) => {
    try{
        const { nombre, password } = req.body;
        const user = await User.findOne({ where: { nombre } });
        if (!user) {
            return res.status(404).json({ message: 'El usuario no ha sido encontrado' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ message: 'La password no son correctas' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ user, token });
    }catch(error){
        console.log({ message: error.message });
        return res.status(500).json({ message: error.message });
    }
};

export const loginController = {
    login
};
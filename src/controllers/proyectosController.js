import { Proyecto } from "../models/Proyectos.js";


export const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.findAll();
    res.json(proyectos);
};

export const crearProyecto = async (req, res) => {
    const { nombre, descripcion, estado } = req.body;
    const nuevoProyecto = await Proyecto.create({ nombre, descripcion, estado });
    res.send(nuevoProyecto);
};


import { Tarea } from "../models/Tareas.js";

export const obtenerTareas = async (req, res) => {
    const tareas = await Tarea.findAll();
    res.json(tareas);
}

export const crearTarea = async (req, res) => {
    const { nombre, descripcion, estado } = req.body;
    const nuevaTarea = await Tarea.create({ nombre, descripcion, estado });
    res.send(nuevaTarea);
}

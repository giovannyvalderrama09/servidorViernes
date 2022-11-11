import { modeloHabitacion } from "../Models/ModeloHabitacion.js";

export class ServicioHabitacion {
  async buscarHabitaciones() {
    let habitaciones = await modeloHabitacion.find();
    return habitaciones;
  }

  async buscarHabitacionPorId(id) {
    let habitacion = await modeloHabitacion.findById(id);
    return habitacion;
  }

  async agregarHabitacionEnBd(datos) {
    let datosValidados = new modeloHabitacion(datos);
    return await datosValidados.save();
  }

  editarHabitacion(id, datos) {
    return modeloHabitacion.findByIdAndUpdate(id, datos);
  }
}

import { ServicioHabitacion } from "../services/servicioHabitacion.js";
export class ControladorHabitacion {
  constructor() {}

  async buscarHabitaciones(request, response) {
    let objetoServicioHabitacion = new ServicioHabitacion();

    try {
      response.status(200).json({
        mensaje: "exito en la consulta",
        datos: await objetoServicioHabitacion.buscarHabitaciones(),
      });
    } catch (error) {
      response.status(400).json({
        mensaje: "error en la consulta" + error,
        datos: null,
      });
    }
  }

  async buscarHabitacionesPorId(request, response) {
    let id = request.params.idHabitacion; //recibo id de la peticion
    let objetoServicioHabitacion = new ServicioHabitacion();

    try {
      response.status(200).json({
        mensaje: "exito en la consulta " + id,
        datos: await objetoServicioHabitacion.buscarHabitacionPorId(id),
      });
    } catch (error) {
      response.status(400).json({
        mensaje: "error en la consulta " + error,
        datos: null,
      });
    }
  }

  async registrarHabitacion(request, response) {
    let datosHabitacion = request.body;
    let objetoServicioHabitacion = new ServicioHabitacion();

    try {
      if (datosHabitacion.numeroMaximoPersonas < 8) {
        await objetoServicioHabitacion.agregarHabitacionEnBd(datosHabitacion);

        response.status(200).json({
          mensaje: "exito registrando habitacion",
          datos: null,
        });
      } else {
        response.status(400).json({
          mensaje: "Solo se permiten 8 personas en esta habitación",
          datos: null,
        });
      }
    } catch (error) {
      response.status(400).json({
        mensaje: "error en la consulta" + error,
        datos: null,
      });
    }
  }

  async editarHabitacion(request, response) {
    let id = request.params.idHabitacion;
    let datosHabitacion = request.body;
    let objetoServicioHabitacion = new ServicioHabitacion();
    try {
      await objetoServicioHabitacion.editarHabitacion(id, datosHabitacion);
      response.status(200).json({
        mensaje: "exito editando" + id,
        datos: null,
      });
    } catch (error) {
      response.status(400).json({
        mensaje: "error en la edicion de habitacion" + error,
        datos: null,
      });
    }
  }
}

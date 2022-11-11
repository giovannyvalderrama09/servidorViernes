import { ServicioReserva } from "../services/servicioReserva.js";
import { ServicioHabitacion } from "../services/servicioHabitacion.js";
export class ControladorReservas {
  constructor() {}

  async buscarReservas(request, response) {
    let objetoServicioReserva = new ServicioReserva();
    try {
      response.status(200).json({
        mensaje: "exito en la consulta de reservas",
        datos: await objetoServicioReserva.buscarReservas(),
      });
    } catch (error) {
      response.status(400).json({
        mensaje: "error en la consulta" + error,
        datos: null,
      });
    }
  }

  async buscarReservasPorId(request, response) {
    let id = request.params.idReserva;
    let objetoServicioReserva = new ServicioReserva();

    try {
      response.status(200).json({
        mensaje: "exito en la consulta de reserva" + id,
        datos: await objetoServicioReserva.buscarReservasPorId(id),
      });
    } catch (error) {
      response.status(400).json({
        mensaje: "error en la consulta" + error,
        datos: null,
      });
    }
  }

  async registrarReservas(request, response) {
    let datosreserva = request.body;
    let objetoServicioReserva = new ServicioReserva();
    let objetoServicioHabitacion = new ServicioHabitacion();
    console.log(datosreserva);
    try {
      let datos__habitacion =
        await objetoServicioHabitacion.buscarHabitacionPorId(datosreserva.id);
      let maxPersonas = datos__habitacion.numeroMaximoPersonas;
      let numeroPersonas =
        Number(datosreserva.numeroNinos) + Number(datosreserva.numeroAdultos);
      let entrada = new Date(datosreserva.fechaEntrada);
      let salida = new Date(datosreserva.fechaSalida);
      const diffInDays = Math.floor((salida - entrada) / (1000 * 60 * 60 * 24));
      let costo = 0;
      console.log("numero de personas ", maxPersonas, numeroPersonas);
      if (diffInDays > 0) {
        if (maxPersonas >= numeroPersonas) {
          costo = Number(datos__habitacion.valorNoche) * Number(diffInDays);
          datosreserva.costoReserva = costo;
          await objetoServicioReserva.agregarR(datosreserva);
          response.status(200).json({
            mensaje: "exito registrando la reserva",
            datos: null,
          });
        } else {
          response.status(400).json({
            mensaje: "No se acepta tantas personas",
            datos: null,
            estado: true,
          });
        }
      } else {
        response.status(400).json({
          mensaje: "No se puede reservar tantos días en esta habitación",
          datos: null,
          estado: true,
        });
      }
    } catch (error) {
      response.status(400).json({
        mensaje: "error en la reserva " + error,
        datos: null,
        estado: true,
      });
    }
  }

  async editarReservas(request, response) {
    let idr = request.params.idreserva;
    let datosReserva = request.body;
    let objetoServicioReserva = new ServicioReserva();
    try {
      await objetoServicioReserva.editarReserva(idr, datosReserva);
      response.status(200).json({
        mensaje: "exito editando la reserva" + idr,
        datos: null,
      });
    } catch (error) {
      response.status(400).json({
        mensaje: "error en la reserva" + error,
        datos: null,
      });
    }
  }
}

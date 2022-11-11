import express from "express";
import { ControladorReservas } from "../Controllers/ControladorReserva.js";
let controladorReservas = new ControladorReservas();
import { ControladorHabitacion } from "../Controllers/ControladorHabitacion.js";
let controladorHabitacion = new ControladorHabitacion();
export let rutasPersonalizadas = express.Router();

// TODO: rutas de habitaciones

rutasPersonalizadas.get(
  "/hoteles/habitaciones",
  controladorHabitacion.buscarHabitaciones
);
rutasPersonalizadas.get(
  "/hoteles/habitacion/:idHabitacion",
  controladorHabitacion.buscarHabitacionesPorId
);
rutasPersonalizadas.post(
  "/hoteles/habitacion",
  controladorHabitacion.registrarHabitacion
);
rutasPersonalizadas.put(
  "/hoteles/modificarhabitacion/:idHabitacion",
  controladorHabitacion.editarHabitacion
);

// FIXME: rutas de reservas habitaciones

rutasPersonalizadas.get(
  "/hoteles/reservas",
  controladorReservas.buscarReservas
);
rutasPersonalizadas.get(
  "/hoteles/reserva/:idReserva",
  controladorReservas.buscarReservasPorId
);
rutasPersonalizadas.post(
  "/hoteles/reserva",
  controladorReservas.registrarReservas
);
rutasPersonalizadas.put(
  "/hoteles/modificoreserva/:idReserva",
  controladorReservas.editarReservas
);

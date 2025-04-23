export const tableName = "api::estado-operador.estado-operador";

export const data = [
  {
    estado_actividad: "Reporte de avance",
    descripcion_estado:
      "Actividad a la cual se le agrega soportes y observaciones de su ejecución",
  },
  {
    estado_actividad: "Sin avance",
    descripcion_estado:
      "Actividad a la cual no se reporta a un cohorte esablecido ningun soporte y observación",
  },
  {
    estado_actividad: "No Aplica para periodo",
    descripcion_estado:
      "Actividad que al cohorte establecido del reporte no requiere cargar soportes y observaciones de su avance",
  },
  {
    estado_actividad: "Reporte Actualizado",
    descripcion_estado:
      "Actividad a la cual previa a la revision de Referente de IDSN se solicitó ajustes a las evidencias, las mismas que son  actualizadas para nueva verificación ",
  },
];

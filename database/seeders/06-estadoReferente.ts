export const tableName = "api::estado-referente.estado-referente";

export const data = [
  {
    estado_actividad: "Sin Reporte",
    descripcion_estado:
      "Actividad que a un cohorte de reporte establecido en anexo tecnico no se evidencia soportes de ejecución, ni novedades presentadas.",
  },
  {
    estado_actividad: "Ajustar soportes",
    descripcion_estado:
      "Actividad que una vez realizada la revisión por parte del referente IDSN, se identifica que hay evidencias que deben ajustarse o modificarse",
  },
  {
    estado_actividad: "Actividad con avance",
    descripcion_estado:
      "Actividad que dispone a un cohorte establecido con soportes y observaciones de avance de manera correcta",
  },
  {
    estado_actividad: "Actividad cerrada",
    descripcion_estado:
      "Actividad que dispone a un cohorte establecido con soportes y observaciones completos que dan cuenta de cumplimiento total de la actividad",
  },
  {
    estado_actividad: "No aplica para periodo",
    descripcion_estado:
      "Actividad que al cohorte establecido del reporte no requiere cargar soportes y obeservaciones de su avance",
  },
  {
    estado_actividad: "Avance Limitado",
    descripcion_estado:
      "Actividad que al cohorte establecido del reporte no dispone de soportes y observaciones efectivas de su ejecución resultado de situaciones de fuerza mayor o externas que no se tiene control o son imprevistas (conflicto, movilidad, emergencias, concertaciones sin avance)",
  },
];

export const tableName = "api::estado-soporte.estado-soporte";

export const data = [
  {
    estado_soporte: "Aprobado",
    descripcion_soporte:
      "Soporte que cumple la condiciones de calidad, pertinencia y completitud solicitadas para la actividad",
  },
  {
    estado_soporte: "No aprobado",
    descripcion_soporte:
      "Soporte que NO cumple la condiciones de calidad, pertinencia y completitud solicitadas para la actividad. Requiere modificarse o ajustarse la evidencia",
  },
  {
    estado_soporte: "Aprobado soporte fisico",
    descripcion_soporte:
      "Soporte fisico que fueron entregados de manera oficial y se reviso cumpliendo los criterios de  calidad, pertinencia y completitud",
  },
  {
    estado_soporte: "No Aprobado soporte fisico",
    descripcion_soporte:
      "Soporte fisico que NO cumple con los criterios de  calidad, pertinencia y completitud establecidos- Requiere modificarse o ajustarse la evidencia",
  },
];

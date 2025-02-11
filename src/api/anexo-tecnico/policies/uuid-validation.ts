/**
 * uuid-validation policy
 */

import { AnexoTecnicoI } from "../../../../types/interfaces/anexo-tecnico.interface";
import { errors } from "@strapi/utils";

export default (policyContext, config, { strapi }) => {
  const requestData: AnexoTecnicoI = policyContext.request.body["data"];

  let canCreateAnexo = true;

  requestData.eventos.forEach((evento) => {
    evento.productos.forEach((producto) => {
      producto.actividades.forEach((actividad) => {
        if (actividad.uuid) {
          canCreateAnexo = false;
        }

        actividad.soportes.forEach((soporte) => {
          if (soporte.uuid) {
            canCreateAnexo = false;
          }
        });
      });
    });
  });

  if (!canCreateAnexo) {
    throw new errors.PolicyError("No se pueden crear anexos con uuids");
  }

  return true;
};

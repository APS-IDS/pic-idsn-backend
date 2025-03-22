/**
 * anexo-tecnico controller
 */

import { factories } from "@strapi/strapi";
import { FORM_LABELS } from "../../../common/static/form-labels.static";

export default factories.createCoreController(
  "api::anexo-tecnico.anexo-tecnico",
  ({ strapi }) => ({
    async labels(ctx) {
      return FORM_LABELS;
    },

    async municipiosEventos(ctx) {
      const result = await strapi
        .service("api::anexo-tecnico.anexo-tecnico")
        .municipiosEventos();

      return result;
    },
    async productosProyecto(ctx) {
      const result = await strapi
        .service("api::anexo-tecnico.anexo-tecnico")
        .productosProyecto();

      return result;
    },
    async eventosOperador(ctx) {
      const result = await strapi
        .service("api::anexo-tecnico.anexo-tecnico")
        .eventosOperador();

      return result;
    },
    async actividadesTecnologia(ctx) {
      const result = await strapi
        .service("api::anexo-tecnico.anexo-tecnico")
        .actividadesTecnologia();

      return result;
    },
    async actividadesEntorno(ctx) {
      const result = await strapi
        .service("api::anexo-tecnico.anexo-tecnico")
        .actividadesEntorno();

      return result;
    },
  })
);

import { Context } from "koa";
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::observacione.observacione",
  ({ strapi }) => ({
    async register(ctx: Context) {
      const user = ctx.state.user;
      const {
        observacion,
        anexo_id,
        id_actividad,
        porcentaje_completado,
        estado,
      } = ctx.request.body;

      const result = await strapi
        .service("api::observacione.observacione")
        .register({
          observacion,
          anexoId: anexo_id,
          idActividad: id_actividad,
          porcentajeCompletado: porcentaje_completado,
          user,
          ctx,
          estado,
        });

      return result;
    },

    async customFind(ctx: Context) {
      const { anexo_id, id_actividad } = ctx.request.query;

      const result = await strapi
        .service("api::observacione.observacione")
        .customFind({
          anexoId: anexo_id,
          idActividad: id_actividad,
        });

      return result;
    },
  })
);

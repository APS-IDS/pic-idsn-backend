import { Context } from "koa";
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::observaciones-referente.observaciones-referente",
  ({ strapi }) => ({
    async register(ctx: Context) {
      const user = ctx.state.user;
      const { observacion, anexo_id, id_actividad } = ctx.request.body;

      const result = await strapi
        .service("api::observaciones-referente.observaciones-referente")
        .register({
          observacion,
          anexoId: anexo_id,
          idActividad: id_actividad,
          user,
          ctx,
        });

      return result;
    },
  })
);

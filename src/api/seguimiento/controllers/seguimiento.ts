import { Core } from "@strapi/strapi";
import { factories } from "@strapi/strapi";
import { Context } from "koa";

export default factories.createCoreController(
  "api::seguimiento.seguimiento",
  ({ strapi }: { strapi: Core.Strapi }) => ({
    async uploadFile(ctx: Context) {
      const user = ctx.state.user;
      const files = ctx.request["files"].files;

      const { anexo_id, soporte_id, municipio_id } = ctx.request.body;

      const result = await strapi
        .service("api::seguimiento.seguimiento")
        .uploadFile({
          anexo_id,
          soporte_id,
          municipio_id,
          user,
          ctx,
          files,
        });

      return result;
    },
    async evidenciaStatus(ctx: Context) {
      const { anexo_id, soporte_id, status_id } = ctx.request.body;

      const result = await strapi
        .service("api::seguimiento.seguimiento")
        .evidenciaStatus({
          anexoId: anexo_id,
          soporteId: soporte_id,
          statusId: status_id,
          ctx,
        });

      return result;
    },
    async checkSeguimiento(ctx: Context) {
      const { anexo_id, soporte_id } = ctx.request.query;

      const result = await strapi
        .service("api::seguimiento.seguimiento")
        .checkSeguimiento({
          anexoId: anexo_id,
          soporteId: soporte_id,
        });

      return result;
    },
    async removeFile(ctx: Context) {
      const { anexo_id, soporte_id, evidencia_id } = ctx.request.body;

      const result = await strapi
        .service("api::seguimiento.seguimiento")
        .removeFile({
          anexoId: anexo_id,
          soporteId: soporte_id,
          evidenciaId: evidencia_id,
          ctx,
        });

      return result;
    },
  })
);

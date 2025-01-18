import { Core } from "@strapi/strapi";
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::seguimiento.seguimiento",
  ({ strapi }: { strapi: Core.Strapi }) => ({
    async uploadFile(ctx) {
      const user = ctx.state.user;
      const files = ctx.request["files"].files;
      console.log(ctx.request.body);

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
  })
);

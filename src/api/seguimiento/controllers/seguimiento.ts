import { Core } from "@strapi/strapi";
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::seguimiento.seguimiento",
  ({ strapi }: { strapi: Core.Strapi }) => ({
    async uploadFile(ctx) {
      const user = ctx.state.user;
      console.log(ctx.request.body);

      const { anexo_id, soporte_id, municipio_id } = ctx.request.body;

      const response = await strapi
        .documents("api::seguimiento.seguimiento")
        .create({
          data: {
            municipio: {
              documentId: municipio_id,
            },
          },
        });

      return response;
    },
  })
);

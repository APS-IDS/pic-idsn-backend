import { factories } from "@strapi/strapi";
import { Context } from "koa";

export default factories.createCoreService(
  "api::seguimiento.seguimiento",
  ({ strapi }) => ({
    async uploadFile({
      anexo_id,
      soporte_id,
      municipio_id,
      user,
      ctx,
      files,
    }: {
      anexo_id: string;
      soporte_id: string;
      municipio_id: string;
      user: any;
      files: any;
      ctx: Context;
    }) {
      const anexo = await strapi
        .documents("api::anexo-tecnico.anexo-tecnico")
        .findFirst({
          filters: {
            $and: [
              {
                documentId: anexo_id,
              },
              {
                eventos: {
                  productos: {
                    actividades: {
                      soportes: {
                        id: soporte_id,
                      },
                    },
                  },
                },
              },
            ],
          },
          populate: {
            eventos: {
              populate: {
                productos: {
                  populate: {
                    actividades: {
                      populate: {
                        soportes: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

      const municipio = await strapi
        .documents("api::municipio.municipio")
        .findOne({
          documentId: municipio_id,
        });

      if (!anexo) {
        return ctx.notFound("Anexo or soporte no encontrado");
      }

      if (!files) {
        return ctx.badRequest("No hay archivos para subir");
      }

      if (!municipio) {
        return ctx.badRequest("Municipio no encontrado");
      }

      const data = {
        fileInfo: {
          name: files["name"],
          folder: null,
        },
      };

      const uploadedFile = await strapi
        .service("plugin::upload.upload")
        .upload({
          data,
          files: files,
        });

      const response = await strapi
        .documents("api::seguimiento.seguimiento")
        .create({
          data: {
            municipio: {
              documentId: municipio_id,
            },
            soporte_id: soporte_id,
            archivos: uploadedFile,
          },
        });

      return response;
    },
  })
);

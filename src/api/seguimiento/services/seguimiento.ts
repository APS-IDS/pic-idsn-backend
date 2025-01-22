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
      console.log("user-->", JSON.stringify(user, null, 2));
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
            user: {
              documentId: user.documentId,
            },
            municipio: {
              documentId: municipio_id,
            },
            soporte_id: soporte_id,
            archivos: uploadedFile,
            anexo_tecnico: {
              documentId: anexo_id,
            },
          },
        });

      return response;
    },
    async checkSeguimiento({
      anexoId,
      soporteId,
    }: {
      anexoId: string;
      soporteId: string;
    }) {
      const seguimiento = await strapi
        .documents("api::seguimiento.seguimiento")
        .findFirst({
          filters: {
            $and: [
              {
                anexo_tecnico: {
                  documentId: anexoId,
                },
              },
              {
                soporte_id: soporteId,
              },
            ],
          },
          populate: {
            archivos: true,
            anexo_tecnico: {
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
            },
            municipio: true,
            user: true,
          },
        });

      return seguimiento;
    },
  })
);

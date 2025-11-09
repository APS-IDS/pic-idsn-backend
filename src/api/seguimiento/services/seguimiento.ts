import { factories } from "@strapi/strapi";
import { Context } from "koa";
import fs from "fs/promises";
import { File } from "formidable";

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
      try {
        const anexo = await this.findAnexo(anexo_id, soporte_id);
        const municipio = await this.findMunicipio(municipio_id);

        if (!anexo) {
          return ctx.notFound("Anexo or soporte no encontrado");
        }

        if (!files) {
          return ctx.badRequest("No hay archivos para subir");
        }

        if (!municipio) {
          return ctx.badRequest("Municipio no encontrado");
        }

        // const uploadedFile = await this.uploadFiles(files);

        const evidencia = await this.createEvidencia(municipio_id, files);

        const seguimiento = await this.findSeguimiento(anexo_id, soporte_id);

        if (seguimiento) {
          return await this.updateSeguimiento(seguimiento, evidencia);
        }

        return await this.createSeguimiento(
          anexo_id,
          soporte_id,
          user,
          evidencia
        );
      } catch (error) {
        strapi.log.error("Error uploading file:", error);
        return ctx.internalServerError(error.message);
      }
    },

    async getFile({ evidenciaId, ctx }: { evidenciaId: string; ctx: Context }) {
      const evidencia = await strapi
        .documents("api::evidencia.evidencia")
        .findOne({
          documentId: evidenciaId,
        });

      if (!evidencia) {
        return ctx.notFound("Evidencia no encontrada");
      }

      const buffer = Buffer.from(evidencia.file_string, "base64");

      ctx.body = buffer;
      ctx.set({
        "Content-Type": evidencia.fileMimeType,
        "Content-Disposition": `attachment; filename="${evidencia.file_name}"`,
      });
      ctx.status = 200;
    },

    async evidenciaStatus({
      anexoId,
      soporteId,
      statusId,
      ctx,
    }: {
      anexoId: string;
      soporteId: string;
      statusId: string;
      ctx: Context;
    }) {
      const seguimiento = await this.findSeguimiento(anexoId, soporteId);

      if (!seguimiento) {
        return ctx.notFound("Anexo or soporte no encontrado");
      }

      const status = await strapi
        .documents("api::estado-soporte.estado-soporte")
        .findOne({
          documentId: statusId,
        });

      if (!status) {
        return ctx.notFound("Estado no encontrado");
      }

      return await strapi.documents("api::seguimiento.seguimiento").update({
        documentId: seguimiento.documentId,
        data: {
          estado_soporte: {
            connect: [status.documentId],
          } as any,
        },
        populate: {
          estado_soporte: true,
        },
      });
    },

    async findAnexo(anexo_id: string, soporte_id: string) {
      return strapi.documents("api::anexo-tecnico.anexo-tecnico").findFirst({
        filters: {
          $and: [
            { documentId: anexo_id },
            {
              eventos: {
                productos: { actividades: { soportes: { uuid: soporte_id } } },
              },
            },
          ],
        },
        populate: {
          eventos: {
            populate: {
              productos: {
                populate: { actividades: { populate: { soportes: true } } },
              },
            },
          },
        },
      });
    },

    async findMunicipio(municipio_id: string) {
      return strapi.documents("api::municipio.municipio").findOne({
        documentId: municipio_id,
      });
    },

    async uploadFiles(files: any) {
      const data = {
        fileInfo: {
          name: files["name"],
          folder: null,
        },
      };

      return strapi.service("plugin::upload.upload").upload({
        data,
        files: files,
      });
    },

    async createEvidencia(municipio_id: string, files: File) {
      const base64Data = await fs.readFile(files.filepath, {
        encoding: "base64",
      });

      return strapi.documents("api::evidencia.evidencia").create({
        data: {
          municipio: { documentId: municipio_id },
          // archivo: uploadedFile,
          file_string: base64Data,
          file_name: files.originalFilename,
          fileMimeType: files.mimetype,
        },
      });
    },

    async findSeguimiento(anexo_id: string, soporte_id: string) {
      return strapi.documents("api::seguimiento.seguimiento").findFirst({
        filters: {
          $and: [
            { anexo_tecnico: { documentId: anexo_id } },
            { soporte_id: soporte_id },
          ],
        },
        populate: {
          evidencias: {
            populate: { archivo: true, municipio: true },
          },
        },
      });
    },

    async updateSeguimiento(seguimiento: any, evidencia: any) {
      const evidencias = seguimiento.evidencias.map((e: any) => e.documentId);
      evidencias.push(evidencia.documentId);

      return strapi.documents("api::seguimiento.seguimiento").update({
        documentId: seguimiento.documentId,
        data: {
          evidencias: evidencias.map((documentId: string) => ({ documentId })),
        },
      });
    },

    async createSeguimiento(
      anexo_id: string,
      soporte_id: string,
      user: any,
      evidencia: any
    ) {
      return strapi.documents("api::seguimiento.seguimiento").create({
        data: {
          evidencias: [{ documentId: evidencia.documentId }],
          user: { documentId: user.documentId },
          soporte_id: soporte_id,
          anexo_tecnico: { documentId: anexo_id },
        },
      });
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
            estado_soporte: true,
            evidencias: {
              populate: {
                archivo: true,
                municipio: true,
              },
            },
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
            user: true,
          },
        });

      return seguimiento;
    },

    async removeFile({ anexoId, soporteId, evidenciaId, ctx }) {
      const seguimiento = await this.findSeguimiento(anexoId, soporteId);

      if (!seguimiento) {
        return ctx.notFound("Seguimiento no encontrado");
      }

      const evidencias = seguimiento.evidencias.map((e: any) => e.documentId);

      const index = evidencias.indexOf(evidenciaId);

      if (index === -1) {
        return ctx.notFound("Evidencia no encontrada");
      }

      const evidenciaToDelete = seguimiento.evidencias[index];

      // const file = await strapi
      //   .service("plugin::upload.upload")
      //   .findOne(evidenciaToDelete.archivo.id);

      // if (!file) {
      //   return ctx.badRequest("Archivo no encontrado");
      // }

      evidencias.splice(index, 1);

      try {
        const seguimientoResult = await strapi
          .documents("api::seguimiento.seguimiento")
          .update({
            documentId: seguimiento.documentId,
            data: {
              evidencias: evidencias.map((documentId: string) => ({
                documentId,
              })),
            },
          });

        const evidenciaResult = await strapi
          .documents("api::evidencia.evidencia")
          .delete({
            documentId: evidenciaToDelete.documentId,
          });

        // const fileResult = await strapi
        //   .service("plugin::upload.upload")
        //   .remove(file);

        return {
          seguimiento: seguimientoResult,
          // file: fileResult,
          evidencia: evidenciaResult,
        };
      } catch (error) {
        strapi.log.error("Error deleting file:", error);
        return ctx.internalServerError(error.message);
      }
    },
  })
);

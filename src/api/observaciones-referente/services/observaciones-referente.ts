import { Core } from "@strapi/strapi";
import { factories } from "@strapi/strapi";
import { Context } from "koa";
import { DateTime } from "luxon";

export default factories.createCoreService(
  "api::observaciones-referente.observaciones-referente",
  ({ strapi }: { strapi: Core.Strapi }) => ({
    async register({
      observacion,
      anexoId,
      idActividad,
      user,
      ctx,
    }: {
      observacion: string;
      anexoId: string;
      idActividad: string;
      user: any;
      ctx: Context;
    }) {
      const anexo = await this.findAnexo(anexoId, idActividad);

      if (!anexo) {
        return ctx.notFound("Anexo o actividad no encontrado");
      }

      const fecha = DateTime.now().setZone("America/Bogota").toISO();

      const observacionRecord = await strapi
        .documents("api::observaciones-referente.observaciones-referente")
        .findFirst({
          filters: {
            anexo_tecnico: { documentId: anexoId },
            id_actividad: idActividad,
          },
        });

      if (observacionRecord) {
        const updatedObservacion = await strapi
          .documents("api::observaciones-referente.observaciones-referente")
          .update({
            documentId: observacionRecord.documentId,
            data: {
              observacion,
              anexo_tecnico: { documentId: anexoId },
              id_actividad: idActividad,
              user: { documentId: user.documentId },
              fecha,
            },
          });

        return { observacion: updatedObservacion, status: "updated" };
      }

      const createdObservacion = await strapi
        .documents("api::observaciones-referente.observaciones-referente")
        .create({
          data: {
            observacion,
            anexo_tecnico: { documentId: anexoId },
            id_actividad: idActividad,
            user: { documentId: user.documentId },
            fecha,
          },
        });

      return { observacion: createdObservacion, status: "created" };
    },
    async findAnexo(anexoId: string, idActividad: string) {
      return strapi.documents("api::anexo-tecnico.anexo-tecnico").findFirst({
        filters: {
          $and: [
            { documentId: anexoId },
            {
              eventos: {
                productos: { actividades: { uuid: idActividad } },
              },
            },
          ],
        },
        populate: {
          eventos: {
            populate: {
              productos: {
                populate: { actividades: true },
              },
            },
          },
        },
      });
    },
  })
);

import { Core } from "@strapi/strapi";
import { factories } from "@strapi/strapi";
import { Context } from "koa";
import { DateTime } from "luxon";

export default factories.createCoreService(
  "api::observacione.observacione",
  ({ strapi }: { strapi: Core.Strapi }) => ({
    async register({
      observacion,
      anexoId,
      idActividad,
      porcentajeCompletado,
      user,
      tipo,
      ctx,
      estado,
    }: {
      observacion: string;
      anexoId: string;
      idActividad: string;
      porcentajeCompletado: number;
      user: any;
      tipo: "operador" | "referente";
      ctx: Context;
      estado: string;
    }) {
      const anexo = await this.findAnexo(anexoId, idActividad);

      if (!anexo) {
        return ctx.notFound("Anexo o actividad no encontrado");
      }

      const fecha = DateTime.now().setZone("America/Bogota").toISO();

      const observacionRecord = await strapi
        .documents("api::observacione.observacione")
        .findFirst({
          filters: {
            anexo_tecnico: { documentId: anexoId },
            id_actividad: idActividad,
            tipo: tipo,
          },
        });

      if (observacionRecord) {
        const updatedObservacion = await strapi
          .documents("api::observacione.observacione")
          .update({
            documentId: observacionRecord.documentId,
            data: {
              observacion,
              anexo_tecnico: { documentId: anexoId },
              id_actividad: idActividad,
              user: { documentId: user.documentId },
              porcentaje_completado: porcentajeCompletado,
              estado,
              fecha,
              tipo,
            },
          });

        return { observacion: updatedObservacion, status: "updated" };
      }

      const createdObservacion = await strapi
        .documents("api::observacione.observacione")
        .create({
          data: {
            observacion,
            anexo_tecnico: { documentId: anexoId },
            id_actividad: idActividad,
            estado,
            user: { documentId: user.documentId },
            fecha,
            tipo,
          },
        });

      return { observacion: createdObservacion, status: "created" };
    },

    async customFind({
      anexoId,
      idActividad,
    }: {
      anexoId: string;
      idActividad: string;
    }) {
      const observaciones = await strapi
        .documents("api::observacione.observacione")
        .findMany({
          filters: {
            anexo_tecnico: { documentId: anexoId },
            id_actividad: idActividad,
          },
        });

      return {
        operador:
          observaciones.filter(
            (observacion) => observacion.tipo === "operador"
          )?.[0] || null,
        referente:
          observaciones.filter(
            (observacion) => observacion.tipo === "referente"
          )?.[0] || null,
      };
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

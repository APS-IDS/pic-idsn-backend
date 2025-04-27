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
      ctx,
      estado,
    }: {
      observacion: string;
      anexoId: string;
      idActividad: string;
      porcentajeCompletado: number;
      user: any;
      ctx: Context;
      estado: string;
    }) {
      const anexo = await this.findAnexo(anexoId, idActividad);

      if (!anexo) {
        return ctx.notFound("Anexo o actividad no encontrado");
      }

      const populatedUser = await strapi
        .documents("plugin::users-permissions.user")
        .findOne({ documentId: user.documentId, populate: ["custom_role"] });

      if (!populatedUser.custom_role?.documentId) {
        return ctx.forbidden("No tienes permisos para realizar esta acción");
      }

      const fecha = DateTime.now().setZone("America/Bogota").toISO();

      const observacionRecord = await strapi
        .documents("api::observacione.observacione")
        .findFirst({
          filters: {
            anexo_tecnico: { documentId: anexoId },
            id_actividad: idActividad,
            custom_role: {
              documentId: populatedUser.custom_role.documentId,
            },
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
              custom_role: {
                documentId: populatedUser.custom_role.documentId,
              },
            },
            populate: {
              custom_role: true,
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
            porcentaje_completado: porcentajeCompletado,
            fecha,
            custom_role: {
              documentId: populatedUser.custom_role.documentId,
            },
          },
          populate: {
            custom_role: true,
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
          populate: {
            custom_role: true,
          },
        });

      return {
        operador:
          observaciones.filter(
            (observacion) => observacion.custom_role?.name === "operador"
          )?.[0] || null,
        referente:
          observaciones.filter(
            (observacion) =>
              observacion.custom_role?.name === "referente_instituto"
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

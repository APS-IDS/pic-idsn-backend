/**
 * anexo-tecnico controller
 */

import { factories } from "@strapi/strapi";
import { FORM_LABELS } from "../../../common/static/form-labels.static";
import { CustomRoles } from "../../../../database/seeders/09-customRoles";

export default factories.createCoreController(
  "api::anexo-tecnico.anexo-tecnico",
  ({ strapi }) => ({
    async find(ctx) {
      const user = ctx.state.user;

      if (user) {
        const fullUser = await strapi.db
          .query("plugin::users-permissions.user")
          .findOne({
            where: { id: user.id },
            populate: ["custom_roles", "operador_pic"],
          });


        const isOperador = fullUser?.custom_roles?.some(
          (role) => role.name === CustomRoles.OPERADOR
        );

        if (isOperador && fullUser.operador_pic) {
          ctx.query = {
            ...ctx.query,
            filters: {
              ...(ctx.query.filters as object || {}),
              eventos: {
                operador_pic: {
                  documentId: fullUser.operador_pic.documentId,
                },
              },
            },
          };
        }
      }

      const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const { results, pagination } = await strapi
        .service("api::anexo-tecnico.anexo-tecnico")
        .find(sanitizedQueryParams);
      const sanitizedResults = await this.sanitizeOutput(results, ctx);
      return this.transformResponse(sanitizedResults, { pagination });
    },

    async labels(ctx) {
      return FORM_LABELS;
    },

    async municipiosEventos(ctx) {
      const result = await strapi
        .service("api::anexo-tecnico.anexo-tecnico")
        .municipiosEventos();

      return result;
    },
    async productosProyecto(ctx) {
      const result = await strapi
        .service("api::anexo-tecnico.anexo-tecnico")
        .productosProyecto();

      return result;
    },
    async eventosOperador(ctx) {
      const result = await strapi
        .service("api::anexo-tecnico.anexo-tecnico")
        .eventosOperador();

      return result;
    },
    async eventosOperadorPorAnio(ctx) {
      const rawYearParam = Array.isArray(ctx.query.year)
        ? ctx.query.year[0]
        : ctx.query.year;
      const yearParam = String(rawYearParam ?? "2025");
      const yearString = /^\d{4}-\d{2}-\d{2}$/.test(yearParam)
        ? yearParam.slice(0, 4)
        : yearParam;
      let year = Number.parseInt(yearString, 10);
      if (Number.isNaN(year)) year = 2025;

      const result = await strapi
        .service("api::anexo-tecnico.anexo-tecnico")
        .eventosOperadorPorAnio(year);

      return result;
    },
    async eventosProyectoPorAnio(ctx) {
      const rawYearParam = Array.isArray(ctx.query.year)
        ? ctx.query.year[0]
        : ctx.query.year;
      const yearParam = String(rawYearParam ?? "2025");
      const yearString = /^\d{4}-\d{2}-\d{2}$/.test(yearParam)
        ? yearParam.slice(0, 4)
        : yearParam;
      let year = Number.parseInt(yearString, 10);
      if (Number.isNaN(year)) year = 2025;

      const result = await strapi
        .service("api::anexo-tecnico.anexo-tecnico")
        .eventosProyectoPorAnio(year);

      return result;
    },
    async actividadesTecnologia(ctx) {
      const result = await strapi
        .service("api::anexo-tecnico.anexo-tecnico")
        .actividadesTecnologia();

      return result;
    },
    async actividadesEntorno(ctx) {
      const result = await strapi
        .service("api::anexo-tecnico.anexo-tecnico")
        .actividadesEntorno();

      return result;
    },
    async actividadesPoblacion(ctx) {
      const result = await strapi
        .service("api::anexo-tecnico.anexo-tecnico")
        .actividadesPoblacion();

      return result;
    },
    async actividadesMes(ctx) {
      const result = await strapi
        .service("api::anexo-tecnico.anexo-tecnico")
        .actividadesMes();

      return result;
    },
    async soportesEstado(ctx) {
      const result = await strapi
        .service("api::anexo-tecnico.anexo-tecnico")
        .soportesEstado();

      return result;
    },
    async actividadesPorEstado(ctx) {
      const result = await strapi
        .service("api::anexo-tecnico.anexo-tecnico")
        .actividadesPorEstado();

      return result;
    },
    async dasboardAll(ctx) {
      const result = await strapi
        .service("api::anexo-tecnico.anexo-tecnico")
        .dashboardAll();

      return result;
    },
  })
);

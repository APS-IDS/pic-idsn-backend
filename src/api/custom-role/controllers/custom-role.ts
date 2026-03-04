/**
 * custom-role controller
 */
import { Context } from "koa";
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::custom-role.custom-role",
  ({ strapi }) => ({
    async register(ctx: Context) {
      const result = await strapi
        .service("api::custom-role.custom-role")
        .register(ctx);

      return result;
    },
  }),
);

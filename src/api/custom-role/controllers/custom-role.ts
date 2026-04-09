/**
 * custom-role controller
 */
import { Context } from "koa";
import { factories } from "@strapi/strapi";
import { CustomRoles } from "../../../../database/seeders/09-customRoles";

export default factories.createCoreController(
  "api::custom-role.custom-role",
  ({ strapi }) => ({
    async register(ctx: Context) {
      const result = await strapi
        .service("api::custom-role.custom-role")
        .register(ctx);

        const user = ctx.state.user;

        const fullUser = await strapi.query("plugin::users-permissions.user").findOne({
          where: { id: user.id },
          populate: ["custom_roles"],
        });


        const isSuperuser = fullUser.custom_roles.some(role => role.name === CustomRoles.SUPERUSER);


        if(!isSuperuser) {
          ctx.status = 403;
          ctx.body = { error: "Access denied. Superuser role required." };
          return;
        }

      return result;
    },
  }),
);

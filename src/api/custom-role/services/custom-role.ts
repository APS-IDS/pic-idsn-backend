/**
 * custom-role service
 */
import { Context } from "koa";
import { Core, factories } from "@strapi/strapi";
import { CustomRoles } from "../../../../database/seeders/09-customRoles";

export default factories.createCoreService(
  "api::custom-role.custom-role",
  ({ strapi }: { strapi: Core.Strapi }) => ({
    async register(ctx: Context) {
      try {
        const {
          username,
          email,
          password,
          confirmed = false,
          blocked = false,
          primer_nombre,
          segundo_nombre,
          primer_apellido,
          segundo_apellido,
          tipo_documento,
          numero_documento,
          profesion,
          cargo,
          entidad,
          custom_roles,
          role,
          operador_pic,
        } = ctx.request.body;

        // Validate required fields
        if (!username || !email || !password) {
          return ctx.badRequest("Username, email, and password are required");
        }

        // Check if user already exists
        const existingUser = await strapi.db
          .query("plugin::users-permissions.user")
          .findOne({
            where: {
              $or: [{ email: email.toLowerCase() }, { username }],
            },
          });

        if (existingUser) {
          return ctx.badRequest("Email or username already taken");
        }

        // Get default role if not provided
        let userRole = role;
        if (!userRole) {
          const defaultRole = await strapi.db
            .query("plugin::users-permissions.role")
            .findOne({
              where: { type: "authenticated" },
            });
          userRole = defaultRole?.id;
        }

        if(custom_roles && custom_roles.length === 0) {
            return ctx.badRequest("At least one custom role must be assigned");
        }

        const roles = await strapi.db
          .query("api::custom-role.custom-role")
          .findMany({
            where: { 
              documentId: { $in: custom_roles }
            },
          });


          for (const role of roles) {
            if (role.name === CustomRoles.OPERADOR){

                if (!operador_pic) {
                    return ctx.badRequest("operador_pic is required for OPERATOR role");
                }

                const operadorPic = await strapi.db
                    .query("api::operador-pic.operador-pic")
                    .findOne({
                        where: { documentId: operador_pic },
                    });

                if (!operadorPic) {
                    return ctx.badRequest("Invalid operador_pic ID");
                }
            }
          }

        // Create the user
        const newUser = await strapi.entityService.create(
          "plugin::users-permissions.user",
          {
            data: {
              username,
              email: email.toLowerCase(),
              password, // Strapi will hash this automatically
              confirmed,
              blocked,
              primer_nombre,
              segundo_nombre,
              primer_apellido,
              segundo_apellido,
              tipo_documento,
              numero_documento,
              profesion,
              cargo,
              entidad,
              custom_roles,
              role: userRole,
              provider: "local",
              operador_pic,
            },
          },
        );
        const schema = strapi.getModel("plugin::users-permissions.user");

        // Remove password from response
        const sanitizedUser = await strapi.contentAPI.sanitize.output(
          newUser,
          schema,
          { auth: ctx.state.user },
        );

        return ctx.send({
          user: sanitizedUser,
          message: "User created successfully",
        });
      } catch (error) {
        strapi.log.error("Error creating user:", error);
        return ctx.internalServerError(
          "An error occurred while creating the user",
        );
      }
    },
  }),
);

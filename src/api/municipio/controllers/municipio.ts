import { Core } from "@strapi/strapi";
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::municipio.municipio",
  ({ strapi }: { strapi: Core.Strapi }) => ({})
);

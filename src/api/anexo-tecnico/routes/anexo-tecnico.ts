/**
 * anexo-tecnico router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::anexo-tecnico.anexo-tecnico", {
  config: {
    create: {
      policies: ["api::anexo-tecnico.uuid-validation"],
    },
  },
});

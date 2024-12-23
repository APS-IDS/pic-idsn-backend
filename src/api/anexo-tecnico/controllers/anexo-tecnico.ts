/**
 * anexo-tecnico controller
 */

import { factories } from "@strapi/strapi";
import { FORM_LABELS } from "../../../common/static/form-labels.static";

export default factories.createCoreController(
  "api::anexo-tecnico.anexo-tecnico",
  {
    labels: async (ctx) => {
      return FORM_LABELS;
    },
  }
);

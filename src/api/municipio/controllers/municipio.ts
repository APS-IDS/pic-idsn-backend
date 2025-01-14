import { Core } from "@strapi/strapi";
import { factories } from "@strapi/strapi";
import { IMetadata, IMunicipio } from "../../../../types/interfaces";

export default factories.createCoreController(
  "api::municipio.municipio",
  ({ strapi }: { strapi: Core.Strapi }) => ({
    async find(ctx) {
      // Calling the default core action
      const { data, meta }: { data: IMunicipio[]; meta: IMetadata } =
        await super.find(ctx);

      const response = data.map((municipio) => {
        municipio.label = `${municipio.nombre_municipio} (${municipio.nodo})`;

        return municipio;
      });

      return { data: response, meta };
    },
    async findOne(ctx) {
      // Calling the default core action
      const { data }: { data: IMunicipio } = await super.findOne(ctx);

      data.label = `${data.nombre_municipio} (${data.nodo})`;

      return { data };
    },
  })
);

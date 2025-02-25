/**
 * anexo-tecnico service
 */

import { Core, factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::anexo-tecnico.anexo-tecnico",
  ({ strapi }: { strapi: Core.Strapi }) => ({
    async municipiosEventos() {
      const results = [];
      const municipios = await strapi
        .documents("api::municipio.municipio")
        .findMany({
          page: 1,
          pageSize: 10,
        });

      // console.log("municipios", municipios);

      await Promise.all(
        municipios.map(async (municipio) => {
          const anexoTecnico = await strapi
            .documents("api::anexo-tecnico.anexo-tecnico")
            .findMany({
              populate: {
                eventos: true,
              },
              filters: {
                eventos: {
                  territorializacion: {
                    municipios: {
                      documentId: municipio.documentId,
                    },
                  },
                },
              },
            });

          if (anexoTecnico.length > 0) {
            let numeroEventos = 0;

            anexoTecnico.forEach((anexo) => {
              numeroEventos += anexo.eventos.length;
            });

            results.push({
              municipio: municipio.nombre_municipio,
              eventos: numeroEventos,
            });
          }
        })
      );

      return { result: results };
    },
  })
);

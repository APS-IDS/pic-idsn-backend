/**
 * anexo-tecnico service
 */

import { Core, factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::anexo-tecnico.anexo-tecnico",
  ({ strapi }: { strapi: Core.Strapi }) => ({
    async municipiosEventos() {
      try {
        const municipios = await this.getMunicipios();

        const eventosPorMunicipio = await Promise.all(
          municipios.map(async (municipio) => {
            const anexoTecnico = await this.getAnexoTecnicoByMunicipio(
              municipio.documentId
            );

            if (anexoTecnico.length === 0) return null;

            const numeroEventos = anexoTecnico.reduce(
              (acc, anexo) => acc + anexo.eventos.length,
              0
            );

            return {
              municipio: municipio.nombre_municipio,
              eventos: numeroEventos,
            };
          })
        );

        const sortedResult = eventosPorMunicipio
          .filter((item) => item !== null)
          .sort((a, b) => b.eventos - a.eventos);

        return { result: sortedResult };
      } catch (error) {
        strapi.log.error("Error fetching municipios eventos:", error);
        throw new Error("Error fetching municipios eventos");
      }
    },
    async getMunicipios() {
      return strapi.documents("api::municipio.municipio").findMany({
        page: 1,
        pageSize: 100,
      });
    },

    async getAnexoTecnicoByMunicipio(municipioId: string) {
      return strapi.documents("api::anexo-tecnico.anexo-tecnico").findMany({
        populate: {
          eventos: true,
        },
        filters: {
          eventos: {
            territorializacion: {
              municipios: {
                documentId: municipioId,
              },
            },
          },
        },
      });
    },
  })
);

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
    async productosProyecto() {
      const proyectos = await this.getProyectos();

      const productosPorProyecto = await Promise.all(
        proyectos.map(async (proyecto) => {
          const anexosTecnicos = await this.getAnexoTecnicoByProyecto(
            proyecto.documentId
          );

          if (anexosTecnicos.length === 0) return null;

          const numeroProductos = anexosTecnicos.reduce(
            (acc, anexo) =>
              acc +
              anexo.eventos.reduce(
                (acc, evento) => acc + evento.productos.length,
                0
              ),
            0
          );

          return {
            proyecto: proyecto.proyecto,
            productos: numeroProductos,
          };
        })
      );

      const sortedResult = productosPorProyecto
        .filter((item) => item !== null)
        .sort((a, b) => b.productos - a.productos);

      return { result: sortedResult };
    },
    async eventosOperador() {
      try {
        const operadores = await this.getOperadores();

        const eventosPorOperador = await Promise.all(
          operadores.map(async (operador) => {
            const anexosTecnicos = await strapi
              .documents("api::anexo-tecnico.anexo-tecnico")
              .findMany({
                filters: {
                  eventos: {
                    operador_pic: {
                      documentId: operador.documentId,
                    },
                  },
                },
                populate: {
                  eventos: true,
                },
              });

            if (anexosTecnicos.length === 0) return null;

            const numeroEventos = anexosTecnicos.reduce(
              (acc, anexo) => acc + anexo.eventos.length,
              0
            );

            return {
              operador: operador.operador_pic,
              eventos: numeroEventos,
            };
          })
        );

        const sortedResult = eventosPorOperador
          .filter((item) => item !== null)
          .sort((a, b) => b.eventos - a.eventos);

        return { result: sortedResult };
      } catch (error) {
        strapi.log.error("Error fetching eventos operador:", error);
        throw new Error("Error fetching eventos operador");
      }
    },
    async getMunicipios() {
      return strapi.documents("api::municipio.municipio").findMany({
        page: 1,
        pageSize: 100,
      });
    },
    async getProyectos() {
      return strapi.documents("api::proyectos-idsn.proyectos-idsn").findMany({
        page: 1,
        pageSize: 100,
      });
    },
    async getOperadores() {
      return strapi.documents("api::operador-pic.operador-pic").findMany({
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
    async getAnexoTecnicoByProyecto(proyectoId: string) {
      return strapi.documents("api::anexo-tecnico.anexo-tecnico").findMany({
        populate: {
          eventos: {
            populate: {
              productos: true,
            },
          },
        },
        filters: {
          eventos: {
            proyectos_idsn: {
              documentId: proyectoId,
            },
          },
        },
      });
    },
  })
);

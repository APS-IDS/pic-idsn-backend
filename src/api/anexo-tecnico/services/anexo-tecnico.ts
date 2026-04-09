/**
 * anexo-tecnico service
 */

import { Core, factories } from "@strapi/strapi";
export interface Cronograma {
  enero: number;
  febrero: number;
  marzo: number;
  abril: number;
  mayo: number;
  junio: number;
  julio: number;
  agosto: number;
  septiembre: number;
  octubre: number;
  noviembre: number;
  diciembre: number;
}

/**
 * Full populate configuration needed for all dashboard analytics.
 * Reused across individual methods and the unified dashboardAll.
 */
const FULL_DASHBOARD_POPULATE = {
  eventos: {
    populate: {
      territorializacion: {
        populate: {
          municipios: true,
        },
      },
      proyectos_idsn: true,
      operador_pic: true,
      productos: {
        populate: {
          actividades: {
            populate: {
              tecnologias: true,
              entornos: true,
              poblaciones: true,
              soportes: true,
            },
          },
        },
      },
    },
  },
};

export default factories.createCoreService(
  "api::anexo-tecnico.anexo-tecnico",
  ({ strapi }: { strapi: Core.Strapi }) => ({
    /**
     * Fetches all anexo-tecnicos with the full dashboard populate.
     * Used as a shared data source for all analytics computations.
     */
    async fetchAllAnexosTecnicos() {
      const allResults: any[] = [];
      let start = 0;
      const limit = 2;

      while (true) {
        const batch = await strapi
          .documents("api::anexo-tecnico.anexo-tecnico")
          .findMany({
            start,
            limit,
            populate: FULL_DASHBOARD_POPULATE,
          });

        allResults.push(...batch);

        if (batch.length === 0 || batch.length < limit) break;
        start += limit;
      }

      return allResults;
    },

    /**
     * Computes municipios-eventos from pre-fetched data.
     */
    computeMunicipiosEventos(anexosTecnicos: any[]) {
      const municipioEventosMap = new Map<string, number>();

      for (const anexo of anexosTecnicos) {
        for (const evento of anexo.eventos || []) {
          const municipios = evento.territorializacion?.municipios || [];
          for (const municipio of municipios) {
            const name = municipio.nombre_municipio;
            if (name) {
              municipioEventosMap.set(
                name,
                (municipioEventosMap.get(name) || 0) + 1
              );
            }
          }
        }
      }

      const result = Array.from(municipioEventosMap.entries())
        .map(([municipio, eventos]) => ({ municipio, eventos }))
        .sort((a, b) => b.eventos - a.eventos);

      return { result };
    },

    /**
     * Computes productos-proyecto from pre-fetched data.
     */
    computeProductosProyecto(anexosTecnicos: any[]) {
      const proyectoProductosMap = new Map<string, number>();

      for (const anexo of anexosTecnicos) {
        for (const evento of anexo.eventos || []) {
          const proyectoName = evento.proyectos_idsn?.proyecto;
          if (!proyectoName) continue;

          const numProductos = (evento.productos || []).length;
          proyectoProductosMap.set(
            proyectoName,
            (proyectoProductosMap.get(proyectoName) || 0) + numProductos
          );
        }
      }

      const result = Array.from(proyectoProductosMap.entries())
        .map(([proyecto, productos]) => ({ proyecto, productos }))
        .sort((a, b) => b.productos - a.productos);

      return { result };
    },

    /**
     * Computes eventos-operador from pre-fetched data.
     */
    computeEventosOperador(anexosTecnicos: any[]) {
      const operadorEventosMap = new Map<string, number>();

      for (const anexo of anexosTecnicos) {
        for (const evento of anexo.eventos || []) {
          const operadorName = evento.operador_pic?.operador_pic;
          if (!operadorName) continue;

          operadorEventosMap.set(
            operadorName,
            (operadorEventosMap.get(operadorName) || 0) + 1
          );
        }
      }

      const result = Array.from(operadorEventosMap.entries())
        .map(([operador, eventos]) => ({ operador, eventos }))
        .sort((a, b) => b.eventos - a.eventos);

      return { result };
    },

    /**
     * Computes actividades-tecnologia from pre-fetched data.
     */
    computeActividadesTecnologia(anexosTecnicos: any[]) {
      const result: Record<string, number> = {};

      for (const anexo of anexosTecnicos) {
        for (const evento of anexo.eventos || []) {
          for (const producto of evento.productos || []) {
            for (const actividad of producto.actividades || []) {
              for (const tecnologia of actividad.tecnologias || []) {
                if (tecnologia.nombre) {
                  result[tecnologia.nombre] =
                    (result[tecnologia.nombre] || 0) + 1;
                }
              }
            }
          }
        }
      }

      return { result };
    },

    /**
     * Computes actividades-entorno from pre-fetched data.
     */
    computeActividadesEntorno(anexosTecnicos: any[]) {
      const result: Record<string, number> = {};

      for (const anexo of anexosTecnicos) {
        for (const evento of anexo.eventos || []) {
          for (const producto of evento.productos || []) {
            for (const actividad of producto.actividades || []) {
              for (const entorno of actividad.entornos || []) {
                if (entorno.nombre) {
                  result[entorno.nombre] = (result[entorno.nombre] || 0) + 1;
                }
              }
            }
          }
        }
      }

      return { result };
    },

    /**
     * Computes actividades-poblacion from pre-fetched data.
     */
    computeActividadesPoblacion(anexosTecnicos: any[]) {
      const result: Record<string, number> = {};

      for (const anexo of anexosTecnicos) {
        for (const evento of anexo.eventos || []) {
          for (const producto of evento.productos || []) {
            for (const actividad of producto.actividades || []) {
              for (const poblacion of actividad.poblaciones || []) {
                if (poblacion.nombre) {
                  result[poblacion.nombre] =
                    (result[poblacion.nombre] || 0) + 1;
                }
              }
            }
          }
        }
      }

      return { result };
    },

    /**
     * Computes actividades-mes from pre-fetched data.
     */
    computeActividadesMes(anexosTecnicos: any[]) {
      const result: Record<string, number> = {};

      for (const anexo of anexosTecnicos) {
        for (const evento of anexo.eventos || []) {
          for (const producto of evento.productos || []) {
            for (const actividad of producto.actividades || []) {
              const cronograma =
                (actividad.cronograma as unknown as Array<Cronograma>) || [];
              for (const cronogramaRecord of cronograma) {
                const mes = Object.keys(cronogramaRecord)[0];
                if (!mes) continue;
                if (!result[mes]) result[mes] = 0;
                if (cronogramaRecord[mes] > 0) result[mes]++;
              }
            }
          }
        }
      }

      return { result };
    },

    /**
     * Computes soportes-estado from pre-fetched data + batch-loaded seguimientos.
     * Eliminates the N+1 query problem by using a lookup map.
     */
    computeSoportesEstado(
      anexosTecnicos: any[],
      seguimientoMap: Map<string, any>
    ) {
      const result: Record<string, number> = {};


      for (const anexo of anexosTecnicos) {
        for (const evento of anexo.eventos || []) {
          for (const producto of evento.productos || []) {
            for (const actividad of producto.actividades || []) {
              for (const soporte of actividad.soportes || []) {
                const key = `${anexo.documentId}_${soporte.uuid}`;
                const seguimiento = seguimientoMap.get(key);
                const estadoNombre =
                  seguimiento?.estado_soporte?.estado_soporte;
                if (!estadoNombre) continue;

                result[estadoNombre] = (result[estadoNombre] || 0) + 1;
              }
            }
          }
        }
      }


      return { result };
    },

    /**
     * Computes actividades-por-estado from pre-fetched data + batch-loaded observaciones.
     * Eliminates the N+1 query problem by using a lookup map.
     */
    computeActividadesPorEstado(
      anexosTecnicos: any[],
      observacionMap: Map<string, any>
    ) {
      const result: Record<string, number> = {};

      for (const anexo of anexosTecnicos) {
        for (const evento of anexo.eventos || []) {
          for (const producto of evento.productos || []) {
            for (const actividad of producto.actividades || []) {
              const key = `${anexo.documentId}_${actividad.uuid}`;
              const observacion = observacionMap.get(key);
              const estadoNombre =
                observacion?.estado_referente?.estado_actividad;
              if (!estadoNombre) continue;

              result[estadoNombre] = (result[estadoNombre] || 0) + 1;
            }
          }
        }
      }

      return { result };
    },

    /**
     * Unified dashboard method: fetches all data in parallel with minimal DB queries,
     * then computes all analytics in-memory.
     *
     * Previous implementation: 9 sequential service calls, each with its own DB query,
     * plus N+1 queries inside soportesEstado and actividadesPorEstado.
     *
     * Now: 3 parallel DB queries (anexos, seguimientos, observaciones) + in-memory processing.
     */
    async dashboardAll() {
      try {
        const [anexosTecnicos, seguimientos, observaciones] = await Promise.all(
          [
            this.fetchAllAnexosTecnicos(),
            strapi.documents("api::seguimiento.seguimiento").findMany({
              pageSize: 1000,
              page: 1,
              populate: {
                estado_soporte: true,
                anexo_tecnico: true,
              },
            }),
            strapi.documents("api::observacione.observacione").findMany({
              pageSize: 1000,
              page: 1,
              populate: {
                estado_referente: true,
                anexo_tecnico: true,
              },
            }),
          ]
        );

        // Build lookup maps for seguimientos and observaciones
        const seguimientoMap = new Map<string, any>();
        for (const seg of seguimientos) {
          if (seg.anexo_tecnico && seg.soporte_id) {
            const key = `${seg.anexo_tecnico.documentId}_${seg.soporte_id}`;
            seguimientoMap.set(key, seg);
          }
        }


        const observacionMap = new Map<string, any>();
        for (const obs of observaciones) {
          if (obs.anexo_tecnico && obs.id_actividad) {
            const key = `${obs.anexo_tecnico.documentId}_${obs.id_actividad}`;
            observacionMap.set(key, obs);
          }
        }

        // Compute all analytics from the single pre-fetched dataset
        return {
          municipiosEventos: this.computeMunicipiosEventos(anexosTecnicos),
          productosProyecto: this.computeProductosProyecto(anexosTecnicos),
          eventosOperador: this.computeEventosOperador(anexosTecnicos),
          actividadesTecnologia:
            this.computeActividadesTecnologia(anexosTecnicos),
          actividadesEntorno: this.computeActividadesEntorno(anexosTecnicos),
          actividadesPoblacion:
            this.computeActividadesPoblacion(anexosTecnicos),
          actividadesMes: this.computeActividadesMes(anexosTecnicos),
          soportesEstado: this.computeSoportesEstado(
            anexosTecnicos,
            seguimientoMap
          ),
          actividadesPorEstado: this.computeActividadesPorEstado(
            anexosTecnicos,
            observacionMap
          ),
        };
      } catch (error) {
        strapi.log.error("Error fetching dashboard data:", error);
        throw new Error("Error fetching dashboard data");
      }
    },

    // --- Individual methods (for standalone endpoints) ---
    // These reuse the same compute functions but fetch data independently.

    async municipiosEventos() {
      try {
        const anexosTecnicos = await this.fetchAllAnexosTecnicos();
        return this.computeMunicipiosEventos(anexosTecnicos);
      } catch (error) {
        strapi.log.error("Error fetching municipios eventos:", error);
        throw new Error("Error fetching municipios eventos");
      }
    },

    async productosProyecto() {
      try {
        const anexosTecnicos = await this.fetchAllAnexosTecnicos();
        return this.computeProductosProyecto(anexosTecnicos);
      } catch (error) {
        strapi.log.error("Error fetching productos proyecto:", error);
        throw new Error("Error fetching productos proyecto");
      }
    },

    async eventosOperador() {
      try {
        const anexosTecnicos = await this.fetchAllAnexosTecnicos();
        return this.computeEventosOperador(anexosTecnicos);
      } catch (error) {
        strapi.log.error("Error fetching eventos operador:", error);
        throw new Error("Error fetching eventos operador");
      }
    },

    async actividadesTecnologia() {
      try {
        const anexosTecnicos = await this.fetchAllAnexosTecnicos();
        return this.computeActividadesTecnologia(anexosTecnicos);
      } catch (error) {
        strapi.log.error("Error fetching actividades tecnologia:", error);
        throw new Error("Error fetching actividades tecnologia");
      }
    },

    async actividadesEntorno() {
      try {
        const anexosTecnicos = await this.fetchAllAnexosTecnicos();
        return this.computeActividadesEntorno(anexosTecnicos);
      } catch (error) {
        strapi.log.error("Error fetching actividades entorno:", error);
        throw new Error("Error fetching actividades entorno");
      }
    },

    async actividadesPoblacion() {
      try {
        const anexosTecnicos = await this.fetchAllAnexosTecnicos();
        return this.computeActividadesPoblacion(anexosTecnicos);
      } catch (error) {
        strapi.log.error("Error fetching actividades poblacion:", error);
        throw new Error("Error fetching actividades poblacion");
      }
    },

    async actividadesMes() {
      try {
        const anexosTecnicos = await this.fetchAllAnexosTecnicos();
        return this.computeActividadesMes(anexosTecnicos);
      } catch (error) {
        strapi.log.error("Error fetching actividades mes:", error);
        throw new Error("Error fetching actividades mes");
      }
    },

    async soportesEstado() {
      try {
        const [anexosTecnicos, seguimientos] = await Promise.all([
          this.fetchAllAnexosTecnicos(),
          strapi.documents("api::seguimiento.seguimiento").findMany({
            pageSize: 10000,
            page: 1,
            populate: {
              estado_soporte: true,
              anexo_tecnico: true,
            },
          }),
        ]);

        const seguimientoMap = new Map<string, any>();
        for (const seg of seguimientos) {
          if (seg.anexo_tecnico && seg.soporte_id) {
            const key = `${seg.anexo_tecnico.documentId}_${seg.soporte_id}`;
            seguimientoMap.set(key, seg);
          }
        }

        return this.computeSoportesEstado(anexosTecnicos, seguimientoMap);
      } catch (error) {
        strapi.log.error("Error fetching soportes estado:", error);
        throw new Error("Error fetching soportes estado");
      }
    },

    async actividadesPorEstado() {
      try {
        const [anexosTecnicos, observaciones] = await Promise.all([
          this.fetchAllAnexosTecnicos(),
          strapi.documents("api::observacione.observacione").findMany({
            pageSize: 10000,
            page: 1,
            populate: {
              estado_referente: true,
              anexo_tecnico: true,
            },
          }),
        ]);

        const observacionMap = new Map<string, any>();
        for (const obs of observaciones) {
          if (obs.anexo_tecnico && obs.id_actividad) {
            const key = `${obs.anexo_tecnico.documentId}_${obs.id_actividad}`;
            observacionMap.set(key, obs);
          }
        }

        return this.computeActividadesPorEstado(
          anexosTecnicos,
          observacionMap
        );
      } catch (error) {
        strapi.log.error("Error fetching actividades por estado:", error);
        throw new Error("Error fetching actividades por estado");
      }
    },
  })
);

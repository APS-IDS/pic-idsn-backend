import { uuid } from "uuidv4";

export default {
  async afterCreate({ result }) {
    try {
      const anexoTecnico = await strapi
        .documents("api::anexo-tecnico.anexo-tecnico")
        .findOne({
          documentId: result.documentId,
          populate: {
            eventos: {
              populate: {
                productos: {
                  populate: {
                    actividades: {
                      populate: {
                        soportes: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

      if (!anexoTecnico) {
        return;
      }

      const newAnexoTecnico = {
        ...anexoTecnico,
        eventos: anexoTecnico.eventos.map((evento) => {
          return {
            ...evento,
            productos: evento.productos.map((producto) => {
              return {
                ...producto,
                actividades: producto.actividades.map((actividad) => {
                  return {
                    ...actividad,
                    soportes: actividad.soportes.map((soporte) => {
                      return {
                        ...soporte,
                        uuid: uuid(),
                      };
                    }),
                  };
                }),
              };
            }),
          };
        }),
      };

      await strapi.documents("api::anexo-tecnico.anexo-tecnico").update({
        documentId: result.documentId,
        data: {
          eventos: newAnexoTecnico.eventos,
        },
      });
    } catch (error) {
      await strapi.documents("api::anexo-tecnico.anexo-tecnico").delete({
        documentId: result.documentId,
      });

      throw error;
    }
  },
};

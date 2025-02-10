import { uuid } from "uuidv4";
import { AnexoTecnicoI } from "../../../../../types/interfaces/anexo-tecnico.interface";

export default {
  async afterCreate({ result }) {
    await updateUUIDAnexoTecnico(result);
  },
  async afterUpdate({ result }) {
    await updateUUIDAnexoTecnico(result);
  },
};

const updateUUIDAnexoTecnico = async (result: { documentId: string }) => {
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

    const { anexoTecnico: newAnexoTecnico, shouldUpdate } = getNewAnexoTecnico(
      anexoTecnico as unknown as AnexoTecnicoI
    );

    if (!shouldUpdate) {
      return;
    }

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
};

const getNewAnexoTecnico = (anexoTecnico: AnexoTecnicoI) => {
  let shouldUpdateResult = false;

  return {
    anexoTecnico: {
      ...anexoTecnico,
      eventos: anexoTecnico.eventos.map((evento) => {
        return {
          ...evento,
          productos: evento.productos.map((producto) => {
            return {
              ...producto,
              actividades: producto.actividades.map((actividad) => {
                const { uuid: actividadUUID, shouldUpdate } = getUUID(
                  actividad.uuid
                );
                shouldUpdateResult = shouldUpdate;
                return {
                  ...actividad,
                  uuid: actividadUUID,
                  soportes: actividad.soportes.map((soporte) => {
                    const { uuid: soporteUUID, shouldUpdate } = getUUID(
                      soporte.uuid
                    );
                    shouldUpdateResult = shouldUpdate;
                    return {
                      ...soporte,
                      uuid: soporteUUID,
                    };
                  }),
                };
              }),
            };
          }),
        };
      }),
    },
    shouldUpdate: shouldUpdateResult,
  };
};

const getUUID = (olUUID: string) => {
  return olUUID
    ? { uuid: olUUID, shouldUpdate: false }
    : { uuid: uuid(), shouldUpdate: true };
};

import type { Struct, Schema } from '@strapi/strapi';

export interface EventoSpSoporte extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_soportes';
  info: {
    displayName: 'soporte';
    icon: 'attachment';
  };
  attributes: {
    nombre: Schema.Attribute.String;
    archivos: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface EventoSpEvento extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_eventos';
  info: {
    displayName: 'Evento';
    icon: 'apps';
    description: '';
  };
  attributes: {
    nombre: Schema.Attribute.String & Schema.Attribute.Required;
    descripcion: Schema.Attribute.Text & Schema.Attribute.Required;
    indicador: Schema.Attribute.String & Schema.Attribute.Required;
    estrategias: Schema.Attribute.Component<'evento-sp.estrategia', true>;
  };
}

export interface EventoSpEstrategia extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_estrategias';
  info: {
    displayName: 'Estrategia';
    icon: 'clock';
  };
  attributes: {
    descripcion: Schema.Attribute.Text & Schema.Attribute.Required;
    actividades: Schema.Attribute.Component<'evento-sp.actividad', true>;
  };
}

export interface EventoSpActividad extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_actividads';
  info: {
    displayName: 'Actividad';
    icon: 'briefcase';
    description: '';
  };
  attributes: {
    descripcion: Schema.Attribute.Text & Schema.Attribute.Required;
    cantidad_a_ejecutar: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
          max: 100;
        },
        number
      >;
    tecnologia: Schema.Attribute.Enumeration<
      [
        'Informaci\u00F3n en salud',
        'Caracterizaci\u00F3n social y ambiental en entornos de vida cotidiana',
        'Educaci\u00F3n en salud',
      ]
    > &
      Schema.Attribute.Required;
    soportes: Schema.Attribute.Component<'evento-sp.soporte', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'evento-sp.soporte': EventoSpSoporte;
      'evento-sp.evento': EventoSpEvento;
      'evento-sp.estrategia': EventoSpEstrategia;
      'evento-sp.actividad': EventoSpActividad;
    }
  }
}

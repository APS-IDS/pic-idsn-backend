import type { Schema, Struct } from '@strapi/strapi';

export interface EventoSpActividad extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_actividads';
  info: {
    description: '';
    displayName: 'Actividad';
    icon: 'walk';
  };
  attributes: {
    cantidad_a_ejecutar: Schema.Attribute.String;
    cronograma: Schema.Attribute.JSON;
    cups: Schema.Attribute.Component<'evento-sp.cups', false>;
    descripcion: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 600;
      }>;
    entornos: Schema.Attribute.Component<'evento-sp.entorno', true>;
    poblaciones: Schema.Attribute.Component<'evento-sp.poblacion-sujeto', true>;
    soportes: Schema.Attribute.Component<'evento-sp.soporte', true>;
    tecnologias: Schema.Attribute.Component<'evento-sp.tecnologia', true>;
    unidad_medida: Schema.Attribute.String;
    uuid: Schema.Attribute.String;
    valor_total: Schema.Attribute.Float;
    valor_unitario: Schema.Attribute.Float;
  };
}

export interface EventoSpCups extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_cups';
  info: {
    description: '';
    displayName: 'CUPS';
    icon: 'bulletList';
  };
  attributes: {
    codigo: Schema.Attribute.String;
  };
}

export interface EventoSpEjeEstrategico extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_eje_estrategicos';
  info: {
    displayName: 'Eje Estrategico';
    icon: 'briefcase';
  };
  attributes: {
    nombre: Schema.Attribute.String;
  };
}

export interface EventoSpEntorno extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_entornos';
  info: {
    displayName: 'Entorno';
    icon: 'apps';
  };
  attributes: {
    nombre: Schema.Attribute.String;
  };
}

export interface EventoSpEquipo extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_equipos';
  info: {
    displayName: 'Equipo';
    icon: 'archive';
  };
  attributes: {
    nombre: Schema.Attribute.String;
  };
}

export interface EventoSpEvento extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_eventos';
  info: {
    description: '';
    displayName: 'Evento';
    icon: 'chartPie';
  };
  attributes: {
    descripcion: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 400;
      }>;
    ejes_estrategicos: Schema.Attribute.Component<
      'evento-sp.eje-estrategico',
      true
    >;
    equipo: Schema.Attribute.String;
    indicador_evento: Schema.Attribute.String;
    lineas_operativa: Schema.Attribute.Component<
      'evento-sp.linea-operativa',
      false
    >;
    meta_indicador_evento: Schema.Attribute.String;
    operador_pic: Schema.Attribute.Relation<
      'oneToOne',
      'api::operador-pic.operador-pic'
    >;
    perfil_operativo: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 2000;
      }>;
    perfiles_profesional: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 300;
      }>;
    productos: Schema.Attribute.Component<'evento-sp.producto', true> &
      Schema.Attribute.Required;
    proyectos_idsn: Schema.Attribute.Relation<
      'oneToOne',
      'api::proyectos-idsn.proyectos-idsn'
    >;
    territorializacion: Schema.Attribute.Component<
      'evento-sp.territorializacion',
      false
    >;
  };
}

export interface EventoSpIndicador extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_indicadors';
  info: {
    description: '';
    displayName: 'Indicador';
    icon: 'chartBubble';
  };
  attributes: {
    cantidad: Schema.Attribute.Integer;
    indicador_linea_base: Schema.Attribute.String;
    meta_producto: Schema.Attribute.String;
  };
}

export interface EventoSpLineaOperativa extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_linea_operativas';
  info: {
    displayName: 'Linea operativa';
    icon: 'collapse';
  };
  attributes: {
    nombre: Schema.Attribute.String;
  };
}

export interface EventoSpOperadorPic extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_operador_pics';
  info: {
    displayName: 'Operador PIC';
    icon: 'picture';
  };
  attributes: {
    descripcion: Schema.Attribute.Text;
    nombre_entidad: Schema.Attribute.String;
  };
}

export interface EventoSpPerfilOperativo extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_perfil_operativos';
  info: {
    displayName: 'perfil operativo';
    icon: 'attachment';
  };
  attributes: {
    descripcion: Schema.Attribute.Text;
  };
}

export interface EventoSpPerfilProfesional extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_perfil_profesionals';
  info: {
    displayName: 'Perfil profesional';
    icon: 'database';
  };
  attributes: {
    nombre: Schema.Attribute.String;
  };
}

export interface EventoSpPoblacionSujeto extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_poblacion_sujetos';
  info: {
    displayName: 'Poblacion sujeto';
    icon: 'eye';
  };
  attributes: {
    nombre: Schema.Attribute.String;
  };
}

export interface EventoSpProducto extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_productos';
  info: {
    description: '';
    displayName: 'Producto';
    icon: 'calendar';
  };
  attributes: {
    actividades: Schema.Attribute.Component<'evento-sp.actividad', true>;
    descripcion: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 600;
      }>;
    indicadores: Schema.Attribute.Component<'evento-sp.indicador', true>;
  };
}

export interface EventoSpProyectoIdsn extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_proyecto_idsns';
  info: {
    description: '';
    displayName: 'proyecto_idsn';
    icon: 'command';
  };
  attributes: {
    proyecto: Schema.Attribute.String;
  };
}

export interface EventoSpSoporte extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_soportes';
  info: {
    description: '';
    displayName: 'Soporte';
    icon: 'attachment';
  };
  attributes: {
    cantidad: Schema.Attribute.Integer;
    descripcion: Schema.Attribute.Text;
    tipo: Schema.Attribute.String;
    uuid: Schema.Attribute.String;
  };
}

export interface EventoSpTecnologia extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_tecnologias';
  info: {
    displayName: 'Tecnologia';
    icon: 'cloud';
  };
  attributes: {
    nombre: Schema.Attribute.String;
  };
}

export interface EventoSpTerritorializacion extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_territorializacions';
  info: {
    description: '';
    displayName: 'Territorializacion';
    icon: 'command';
  };
  attributes: {
    microterritorio: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 600;
      }>;
    municipios: Schema.Attribute.Relation<
      'oneToMany',
      'api::municipio.municipio'
    >;
    numero_hogares: Schema.Attribute.Integer;
    territorio: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 600;
      }>;
  };
}

export interface EventoSpUnidadMedida extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_unidad_medidas';
  info: {
    displayName: 'Unidad medida';
    icon: 'chartCircle';
  };
  attributes: {
    nombre: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'evento-sp.actividad': EventoSpActividad;
      'evento-sp.cups': EventoSpCups;
      'evento-sp.eje-estrategico': EventoSpEjeEstrategico;
      'evento-sp.entorno': EventoSpEntorno;
      'evento-sp.equipo': EventoSpEquipo;
      'evento-sp.evento': EventoSpEvento;
      'evento-sp.indicador': EventoSpIndicador;
      'evento-sp.linea-operativa': EventoSpLineaOperativa;
      'evento-sp.operador-pic': EventoSpOperadorPic;
      'evento-sp.perfil-operativo': EventoSpPerfilOperativo;
      'evento-sp.perfil-profesional': EventoSpPerfilProfesional;
      'evento-sp.poblacion-sujeto': EventoSpPoblacionSujeto;
      'evento-sp.producto': EventoSpProducto;
      'evento-sp.proyecto-idsn': EventoSpProyectoIdsn;
      'evento-sp.soporte': EventoSpSoporte;
      'evento-sp.tecnologia': EventoSpTecnologia;
      'evento-sp.territorializacion': EventoSpTerritorializacion;
      'evento-sp.unidad-medida': EventoSpUnidadMedida;
    }
  }
}

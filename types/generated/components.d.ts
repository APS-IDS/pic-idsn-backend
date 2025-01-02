import type { Struct, Schema } from '@strapi/strapi';

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

export interface EventoSpTerritorializacion extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_territorializacions';
  info: {
    displayName: 'Territorializacion';
    icon: 'command';
    description: '';
  };
  attributes: {
    numero_hogares: Schema.Attribute.Integer;
    municipio: Schema.Attribute.String;
    territorio: Schema.Attribute.String;
    microterritorio: Schema.Attribute.String;
    subregion: Schema.Attribute.String;
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

export interface EventoSpSoporte extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_soportes';
  info: {
    displayName: 'Soporte';
    icon: 'attachment';
    description: '';
  };
  attributes: {
    tipo: Schema.Attribute.String;
    descripcion: Schema.Attribute.Text;
    archivos: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    users: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface EventoSpProyectoIdsn extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_proyecto_idsns';
  info: {
    displayName: 'proyecto_idsn';
    icon: 'command';
    description: '';
  };
  attributes: {
    proyecto: Schema.Attribute.String;
  };
}

export interface EventoSpProducto extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_productos';
  info: {
    displayName: 'Producto';
    icon: 'calendar';
    description: '';
  };
  attributes: {
    actividades: Schema.Attribute.Component<'evento-sp.actividad', true>;
    descripcion: Schema.Attribute.Text;
    operador_pic: Schema.Attribute.Component<'evento-sp.operador-pic', false>;
    indicadores: Schema.Attribute.Component<'evento-sp.indicador', true>;
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

export interface EventoSpOperadorPic extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_operador_pics';
  info: {
    displayName: 'Operador PIC';
    icon: 'picture';
  };
  attributes: {
    nombre_entidad: Schema.Attribute.String;
    descripcion: Schema.Attribute.Text;
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

export interface EventoSpIndicador extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_indicadors';
  info: {
    displayName: 'Indicador';
    icon: 'chartBubble';
    description: '';
  };
  attributes: {
    meta_producto: Schema.Attribute.String;
    indicador_linea_base: Schema.Attribute.String;
    cantidad: Schema.Attribute.Integer;
  };
}

export interface EventoSpEvento extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_eventos';
  info: {
    displayName: 'Evento';
    icon: 'chartPie';
    description: '';
  };
  attributes: {
    descripcion: Schema.Attribute.Text;
    ejes_estrategicos: Schema.Attribute.Component<
      'evento-sp.eje-estrategico',
      true
    >;
    lineas_operativa: Schema.Attribute.Component<
      'evento-sp.linea-operativa',
      true
    >;
    productos: Schema.Attribute.Component<'evento-sp.producto', true>;
    proyecto_idsn: Schema.Attribute.Component<'evento-sp.proyecto-idsn', false>;
    indicador_evento: Schema.Attribute.String;
    meta_indicador_evento: Schema.Attribute.String;
    territorializacion: Schema.Attribute.Component<
      'evento-sp.territorializacion',
      false
    >;
    equipo: Schema.Attribute.String;
    perfiles_profesional: Schema.Attribute.String;
    perfil_operativo: Schema.Attribute.String;
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

export interface EventoSpCups extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_cups';
  info: {
    displayName: 'CUPS';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    codigo: Schema.Attribute.String;
  };
}

export interface EventoSpActividad extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_actividads';
  info: {
    displayName: 'Actividad';
    icon: 'walk';
    description: '';
  };
  attributes: {
    descripcion: Schema.Attribute.Text;
    cantidad_a_ejecutar: Schema.Attribute.String;
    entornos: Schema.Attribute.Component<'evento-sp.entorno', true>;
    tecnologias: Schema.Attribute.Component<'evento-sp.tecnologia', true>;
    poblaciones: Schema.Attribute.Component<'evento-sp.poblacion-sujeto', true>;
    unidad_medida: Schema.Attribute.String;
    cups: Schema.Attribute.Component<'evento-sp.cups', true>;
    valor_unitario: Schema.Attribute.Decimal;
    valor_total: Schema.Attribute.Decimal;
    soportes: Schema.Attribute.Component<'evento-sp.soporte', true>;
    cronograma: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'evento-sp.unidad-medida': EventoSpUnidadMedida;
      'evento-sp.territorializacion': EventoSpTerritorializacion;
      'evento-sp.tecnologia': EventoSpTecnologia;
      'evento-sp.soporte': EventoSpSoporte;
      'evento-sp.proyecto-idsn': EventoSpProyectoIdsn;
      'evento-sp.producto': EventoSpProducto;
      'evento-sp.poblacion-sujeto': EventoSpPoblacionSujeto;
      'evento-sp.perfil-profesional': EventoSpPerfilProfesional;
      'evento-sp.perfil-operativo': EventoSpPerfilOperativo;
      'evento-sp.operador-pic': EventoSpOperadorPic;
      'evento-sp.linea-operativa': EventoSpLineaOperativa;
      'evento-sp.indicador': EventoSpIndicador;
      'evento-sp.evento': EventoSpEvento;
      'evento-sp.equipo': EventoSpEquipo;
      'evento-sp.entorno': EventoSpEntorno;
      'evento-sp.eje-estrategico': EventoSpEjeEstrategico;
      'evento-sp.cups': EventoSpCups;
      'evento-sp.actividad': EventoSpActividad;
    }
  }
}

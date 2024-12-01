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

export interface EventoSpUbicacion extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_ubicacions';
  info: {
    displayName: 'Ubicacion';
    icon: 'pinMap';
  };
  attributes: {
    municipio: Schema.Attribute.Relation<
      'oneToOne',
      'api::municipio.municipio'
    >;
    subregion: Schema.Attribute.Relation<
      'oneToOne',
      'api::subregion.subregion'
    >;
  };
}

export interface EventoSpTerritorializacion extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_territorializacions';
  info: {
    displayName: 'Territorializacion';
    icon: 'command';
  };
  attributes: {
    ubicacion: Schema.Attribute.Component<'evento-sp.ubicacion', false>;
    codigo_microterritorio: Schema.Attribute.String;
    numero_microterritorios: Schema.Attribute.Integer;
    numero_hogares: Schema.Attribute.Integer;
    codigo_territorio: Schema.Attribute.String;
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
  };
  attributes: {
    tipo: Schema.Attribute.String;
    descripcion: Schema.Attribute.Text;
    archivos: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    valor_porcentual: Schema.Attribute.Decimal;
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
    descripcion: Schema.Attribute.Text;
    indicador: Schema.Attribute.Text;
    indicador_linea_base: Schema.Attribute.Text;
    actividades: Schema.Attribute.Component<'evento-sp.actividad', true>;
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

export interface EventoSpOperadorPic extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_operador_pics';
  info: {
    displayName: 'Operador PIC';
    icon: 'picture';
  };
  attributes: {
    nombre_entidad: Schema.Attribute.String;
    municipio: Schema.Attribute.Relation<
      'oneToOne',
      'api::municipio.municipio'
    >;
    descripcion: Schema.Attribute.Text;
  };
}

export interface EventoSpMetasIndicadores extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_metas_indicadores';
  info: {
    displayName: 'Metas Indicadores';
    icon: 'arrowUp';
  };
  attributes: {
    indicador: Schema.Attribute.Component<'evento-sp.indicador', false>;
    meta_resultado: Schema.Attribute.String;
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
    nombre: Schema.Attribute.String;
    descripcion: Schema.Attribute.Text;
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
  };
  attributes: {
    codigo: Schema.Attribute.String;
    sub_codigo: Schema.Attribute.String;
    descripcion: Schema.Attribute.Text;
    valor: Schema.Attribute.Decimal;
  };
}

export interface EventoSpActividad extends Struct.ComponentSchema {
  collectionName: 'components_evento_sp_actividads';
  info: {
    displayName: 'Actividad';
    icon: 'walk';
  };
  attributes: {
    descripcion: Schema.Attribute.Text;
    cantidad_a_ejecutar: Schema.Attribute.String;
    unidad_medida: Schema.Attribute.Component<'evento-sp.unidad-medida', true>;
    entornos: Schema.Attribute.Component<'evento-sp.entorno', true>;
    tecnologias: Schema.Attribute.Component<'evento-sp.tecnologia', true>;
    poblaciones: Schema.Attribute.Component<'evento-sp.poblacion-sujeto', true>;
    soportes: Schema.Attribute.Component<'evento-sp.soporte', true>;
    equipos: Schema.Attribute.Component<'evento-sp.equipo', true>;
    perfiles_profesionales: Schema.Attribute.Component<
      'evento-sp.perfil-profesional',
      true
    >;
    cups: Schema.Attribute.Component<'evento-sp.cups', true>;
    valor_unitario: Schema.Attribute.Decimal;
    valor_total: Schema.Attribute.Decimal;
    Observaciones: Schema.Attribute.Text;
    porcentaje_cumplimiento: Schema.Attribute.Decimal;
    observaciones_seguimiento: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'evento-sp.unidad-medida': EventoSpUnidadMedida;
      'evento-sp.ubicacion': EventoSpUbicacion;
      'evento-sp.territorializacion': EventoSpTerritorializacion;
      'evento-sp.tecnologia': EventoSpTecnologia;
      'evento-sp.soporte': EventoSpSoporte;
      'evento-sp.producto': EventoSpProducto;
      'evento-sp.poblacion-sujeto': EventoSpPoblacionSujeto;
      'evento-sp.perfil-profesional': EventoSpPerfilProfesional;
      'evento-sp.operador-pic': EventoSpOperadorPic;
      'evento-sp.metas-indicadores': EventoSpMetasIndicadores;
      'evento-sp.linea-operativa': EventoSpLineaOperativa;
      'evento-sp.indicador': EventoSpIndicador;
      'evento-sp.equipo': EventoSpEquipo;
      'evento-sp.entorno': EventoSpEntorno;
      'evento-sp.eje-estrategico': EventoSpEjeEstrategico;
      'evento-sp.cups': EventoSpCups;
      'evento-sp.actividad': EventoSpActividad;
    }
  }
}

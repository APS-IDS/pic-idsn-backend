export interface AnexoTecnicoI {
  id: any;
  documentId: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
  locale: null;
  eventos: Evento[];
}

export interface Evento {
  id: any;
  descripcion: string;
  indicador_evento: string;
  meta_indicador_evento: string;
  equipo: string;
  perfiles_profesional: string;
  perfil_operativo: string;
  productos: Producto[];
}

export interface Producto {
  id: any;
  descripcion: string;
  actividades: Actividade[];
}

export interface Actividade {
  id: any;
  descripcion: string;
  cantidad_a_ejecutar: string;
  unidad_medida: string;
  valor_unitario: number;
  valor_total: number;
  cronograma: { [key: string]: number }[];
  uuid: string;
  soportes: Soporte[];
}

export interface Soporte {
  id: any;
  tipo: string;
  descripcion: string;
  cantidad: null;
  uuid: string;
}

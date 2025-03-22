export default {
  routes: [
    {
      method: "GET",
      path: "/municipios-eventos",
      handler: "anexo-tecnico.municipiosEventos",
    },
    {
      method: "GET",
      path: "/productos-proyecto",
      handler: "anexo-tecnico.productosProyecto",
    },
    {
      method: "GET",
      path: "/eventos-operador",
      handler: "anexo-tecnico.eventosOperador",
    },
    {
      method: "GET",
      path: "/actividades-tecnologia",
      handler: "anexo-tecnico.actividadesTecnologia",
    },
    {
      method: "GET",
      path: "/actividades-entorno",
      handler: "anexo-tecnico.actividadesEntorno",
    },
  ],
};

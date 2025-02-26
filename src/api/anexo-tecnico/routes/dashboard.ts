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
  ],
};

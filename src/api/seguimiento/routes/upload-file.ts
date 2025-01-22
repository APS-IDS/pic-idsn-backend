export default {
  routes: [
    {
      method: "POST",
      path: "/seguimiento/upload-file",
      handler: "seguimiento.uploadFile",
    },
    {
      method: "GET",
      path: "/check-seguimiento",
      handler: "seguimiento.checkSeguimiento",
    },
  ],
};

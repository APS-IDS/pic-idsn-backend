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
    {
      method: "PUT",
      path: "/seguimiento/remove-file",
      handler: "seguimiento.removeFile",
    },
    {
      method: "GET",
      path: "/seguimiento/get-file/:id",
      handler: "seguimiento.getFile",
    },
  ],
};

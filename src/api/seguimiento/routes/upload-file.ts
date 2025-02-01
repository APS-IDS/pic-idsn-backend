import path from "path";

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
      method: "POST",
      path: "/seguimiento/delete-file",
      handler: "seguimiento.deleteFile",
    },
  ],
};

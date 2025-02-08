export default {
  routes: [
    {
      method: "POST",
      path: "/observaciones/register",
      handler: "observacione.register",
    },
    {
      method: "GET",
      path: "/observacio/read",
      handler: "observacione.customFind",
    },
  ],
};

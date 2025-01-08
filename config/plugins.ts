export default ({ env }) => ({
  // ...
  "strapi-v5-plugin-populate-deep": {
    config: {
      defaultDepth: 5,
    },
  },
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "1d",
      },
    },
  },
  // ...
});

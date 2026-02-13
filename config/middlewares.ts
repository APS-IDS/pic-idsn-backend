export default ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formidable: {
        // bytes; default 10 MB if env not set
        maxFileSize: env.int('MAX_FILE_SIZE', 10 * 1024 * 1024),
        maxFiles: 1
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

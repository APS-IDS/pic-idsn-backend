import { Core } from "@strapi/strapi";

export default async function generate(
  tableName: any,
  data: any[],
  strapi: Core.Strapi
) {
  //TODO: discuss validations when table is not found, or error when trying to seed the table.
  const entries = await strapi.entityService.findMany(tableName);

  for (const element of data) {
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    await strapi.entityService
      .create(tableName, {
        data: {
          ...element,
        },
      })
      .catch((err) => {
        console.error("seed error", err);
        // for now we just skip the error
        console.error("seed fail to run", tableName);
      });
  }
}

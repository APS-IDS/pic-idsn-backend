import * as fs from "fs";
import * as path from "path";
import generate from "./seederFunction";
import { Core } from "@strapi/strapi";

export default async function runSeeders(strapi: Core.Strapi) {
  const dataDirectory = path.join(__dirname, "../seeders");

  const files = fs.readdirSync(dataDirectory);
  const migratedFiles = (await strapi.entityService.findMany(
    "api::seeded-data.seeded-data",
    {
      fields: ["fileName"],
    }
  )) as unknown as { fileName: string }[];

  const filesToSkip = migratedFiles.map((file) => file.fileName);

  for (const file of files) {
    if (filesToSkip.includes(file)) {
      continue;
    }

    const dataFilePath = path.join(dataDirectory, file);
    const { data, tableName } = await import(dataFilePath);
    await generate(tableName, data, strapi);
    await strapi.entityService.create("api::seeded-data.seeded-data", {
      data: {
        fileName: file,
      },
    });
  }
}

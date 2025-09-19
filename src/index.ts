// import type { Core } from '@strapi/strapi';

import { Core } from "@strapi/strapi";
import runSeeders from "../database/helpers/runSeeders";
import logger from "koa-pino-logger";
import { Logger } from "pino";
import fs from "fs";
import path from "path";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({
    strapi,
  }: {
    strapi: Core.Strapi & { pinoLogger: Logger };
  }) {
    try {
      const logDir = path.join(__dirname, "../..", "logs");
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
      }
      console.log("Log directory:", logDir);
      const logFile = fs.createWriteStream(path.join(logDir, "app.log"), {
        flags: "a",
      });

      const pinoLogger = logger({
        level: "trace",
        stream: logFile,
      });

      strapi.pinoLogger = pinoLogger.logger;
      strapi.server.app.use(pinoLogger);
    } catch (err) {
      console.error("Failed to set up logger:", err);
    }
    await runSeeders(strapi);
  },
};

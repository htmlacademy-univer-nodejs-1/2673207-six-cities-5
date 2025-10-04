#!/usr/bin/env node
import { CLIApplication, HelpCommander, ImportCommander, VersionCommander } from "./cli/index.js";

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommander(),
    new VersionCommander(),
    new ImportCommander(),
  ]);
  cliApplication.processCommand(process.argv)
    .catch((err) => {
      console.info("error:", err.message);
    });

}

bootstrap()

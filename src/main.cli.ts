#!/usr/bin/env node
import 'reflect-metadata';
import { GenerateCommand } from './cli/commands/generate.command.js';
import { CLIApplication, HelpCommander, ImportCommander, VersionCommander } from './cli/index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommander(),
    new VersionCommander(),
    new ImportCommander(),
    new GenerateCommand(),
  ]);
  cliApplication.processCommand(process.argv)
    .catch((err) => {
      console.info('error:', err.message);
    });

}

bootstrap();

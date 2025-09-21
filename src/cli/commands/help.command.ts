import { Commander } from "./command.interface";

export class HelpCommander implements Commander {
  public getName(): string {
    return "--help";
  }

  public async execute(...params: String[]): Promise<void> {
    console.info(`Программа для подготовки данных для REST API сервера.

Пример: cli.js --<command> [--arguments]

Команды:

 --version:                   # выводит номер версии
 --help:                      # печатает этот текст
 --import <path>:             # импортирует данные из TSV`);
  }
}

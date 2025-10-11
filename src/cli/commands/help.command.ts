import chalk from 'chalk';
import { Commander } from './command.interface.js';

export class HelpCommander implements Commander {
  public getName(): string {
    return '--help';
  }

  public async execute(..._params: string[]): Promise<void> {
    console.info(chalk.bold.italic.underline('Программа для подготовки данных для REST API сервера.'));
    console.info(' ');
    console.info(`${chalk.underline('Пример')}: ${chalk.cyan('cli.js --<command> [--arguments]')}

${chalk.underline('Команды')}:

${chalk.cyan('--version                       # выводит номер версии')}:
${chalk.cyan('--help                          # печатает этот текст')}:
${chalk.cyan('--import <path>                 # импортирует данные из TSV')}:
${chalk.cyan('--generate <n> <path> <url>     # генерирует произвольное количество тестовых данных')}`);
  }
}

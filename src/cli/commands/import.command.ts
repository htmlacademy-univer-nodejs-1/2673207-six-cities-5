import { Commander } from "./command.interface";

export class ImportCommander implements Commander {
  execute(...params: String[]): void {
    throw new Error("Method not implemented.");
  }

}

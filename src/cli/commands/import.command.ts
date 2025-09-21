import { Commander } from "./command.interface";

export class ImportCommander implements Commander {
  public getName(): string {
    return "--import";
  }

  public async execute(...params: String[]): Promise<void> {
    console.log("Import command executes")
  }
}

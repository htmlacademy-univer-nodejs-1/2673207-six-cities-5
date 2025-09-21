import { Commander } from "./command.interface";

export class VersionCommander implements Commander{
  execute(...params: String[]): void {
    throw new Error("Method not implemented.");
  }
}

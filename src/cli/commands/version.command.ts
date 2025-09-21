import { Commander } from "./command.interface";

export class VersionCommander implements Commander{
  public getName(): string {
    return "--version";
  }

  public async execute(...params: String[]): Promise<void> {
    console.log("Version command execute")
  }
}

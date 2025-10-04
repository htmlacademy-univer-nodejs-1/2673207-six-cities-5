import { TSVFileReader } from "../../shared/libs/file-reader/tsv-file-reader.js";
import { Commander } from "./command.interface.js";

export class ImportCommander implements Commander {
  public getName(): string {
    return "--import";
  }

  public async execute(...params: String[]): Promise<void> {
    const [filename] = params;
    if (filename === undefined) {
      throw new Error("file path is not specified")
    }
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${err.message}`);
    }
  }
}

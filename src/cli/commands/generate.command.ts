import got from "got";

import { MockServerData } from "../../shared/types/index.js";
import { Commander } from "./command.interface.js";
import { TSVOfferGenerator } from "../../shared/libs/offer-generator/tsv-offer-generator.js";
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';

export class GenerateCommand implements Commander {
  private initialData!: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  public getName(): string {
    return '--generate';
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);
    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public async execute(...params: string[]): Promise<void> {
    const [count, filePath, url] = params;
    const offerCount = Number.parseInt(count, 10);
    try {
      await this.load(url);
      await this.write(filePath, offerCount)
    } catch (error: unknown) {
      console.error("Can't generate data");
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}

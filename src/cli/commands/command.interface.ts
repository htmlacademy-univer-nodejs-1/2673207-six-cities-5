export interface Commander {
  getName(): string;
  execute(...params: string[]): void;
}

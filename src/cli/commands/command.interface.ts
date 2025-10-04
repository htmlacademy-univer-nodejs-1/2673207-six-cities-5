export interface Commander {
  getName(): string;
  execute(...params: String[]): void;
}

import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ApplicationError, ValidationErrorField } from '../libs/rest/index.js';
import { ValidationError } from 'class-validator';

export function generateRandomValue(min:number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function generateRandomBoolean(){
  return generateRandomValue(0, 1) === 1;
}

export function reduceValidationErrors(errors: ValidationError[]): ValidationErrorField[] {
  return errors.map(({ property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
}

export function getRandomItems<T>(items: T[]):T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomCountItems<T>(items: T[], count: number): T[] {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(getRandomItem(items));
  }
  return result;
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function createErrorObject(errorType: ApplicationError, error: string, details: ValidationErrorField[] = []) {
  return { errorType, error, details };
}

export function getFullServerPath(host: string, port: number) {
  return `http://${host}:${port}`;
}

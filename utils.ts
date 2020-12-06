import fs from 'fs';

export class Utils {

  public static parseFile = (filePath: string): string[] => {
    return fs.readFileSync(filePath, 'utf8').split(/[\r\n]+/);
  }

  public static parseFileDelimitedByReturns = (filePath: string): string[] => {
    return fs.readFileSync(filePath, 'utf8').split(/[\r\n]{2}/);
  }

  public static parseNumbersFromFile = (filePath: string): number[] => {
    const numbers: any[] = fs.readFileSync(filePath, 'utf8').split(/[\r\n]+/);
    for (let i = 0; i < numbers.length; i++) {
      numbers[i] = +numbers[i];
    }

    return numbers;
  }
}

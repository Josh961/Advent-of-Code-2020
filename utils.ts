import fs from 'fs';

export class Utils {

  public static parseNumbersFromFile = (filePath: string): number[] => {
    const numbers: any[] = fs.readFileSync(filePath, 'utf8').split(/[\r\n]+/);
    for (let i = 0; i < numbers.length; i++) {
      numbers[i] = +numbers[i];
    }

    return numbers;
  }
}

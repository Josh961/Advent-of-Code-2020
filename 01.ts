// Day 1: Report Repair
// https://adventofcode.com/2020/day/1

import { Utils } from './utils';

const numbers = Utils.parseNumbersFromFile('./inputs/01.txt');

for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] + numbers[j] === 2020) {
      console.log(numbers[i] * numbers[j]);
    } else if (numbers[i] + numbers[j] < 2020) {
      for (let k = j + 1; k < numbers.length; k++) {
        if (numbers[i] + numbers[j] + numbers[k] === 2020) {
          console.log(numbers[i] * numbers[j] * numbers[k]);
        }
      }
    }
  }
}

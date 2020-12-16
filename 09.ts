// Day 9: Encoding Error
// https://adventofcode.com/2020/day/9

import { Utils } from './utils';

const numbers = Utils.parseNumbersFromFile('./inputs/09.txt');

const summableNumbers = numbers.splice(0, 25);
for (const number of numbers) {
  let sumsToNumber = false;
  for (let i = 0; i < summableNumbers.length; i++) {
    for (let j = 0; j < summableNumbers.length; j++) {
      if (summableNumbers[i] + summableNumbers[j] === number) {
        sumsToNumber = true;
        i = summableNumbers.length;
        j = summableNumbers.length;
        summableNumbers.shift();
        summableNumbers.push(number);
      }
    }
  }

  if (!sumsToNumber) {
    console.log(number);
    break;
  }
}

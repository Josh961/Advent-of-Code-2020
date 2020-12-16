// Day 9: Encoding Error
// https://adventofcode.com/2020/day/9

import { Utils } from './utils';

const numbers = Utils.parseNumbersFromFile('./inputs/09.txt');

let invalidNumber: number;
const numbersCopy = [...numbers];
const summableNumbers = numbersCopy.splice(0, 25);
for (const number of numbersCopy) {
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
    invalidNumber = number;
    break;
  }
}

console.log(invalidNumber);

let sumOfMinMax: number;
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] >= invalidNumber) { continue; }

  let sumsToInvalidNumber = false;
  let currentSum = numbers[i];
  const contiguousNumbers = [numbers[i]];
  for (let j = i + 1; j < numbers.length; j++) {
    if (currentSum + numbers[j] < invalidNumber) {
      currentSum += numbers[j];
      contiguousNumbers.push(numbers[j]);
    } else if (currentSum + numbers[j] > invalidNumber) {
      break;
    } else {
      contiguousNumbers.push(numbers[j]);
      sumsToInvalidNumber = true;
      break;
    }
  }

  if (sumsToInvalidNumber) {
    const min = Math.min(...contiguousNumbers);
    const max = Math.max(...contiguousNumbers);
    sumOfMinMax = min + max;
    break;
  }
}

console.log(sumOfMinMax);

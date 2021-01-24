// Day 15: Rambunctious Recitation
// https://adventofcode.com/2020/day/15

import { Utils } from './utils';

const numbers = Utils.parseFile('./inputs/15.txt')[0].split(',');

const numbersSpoken: Record<string, number> = {};
let turn = 1;
for (const number of numbers) {
  numbersSpoken[number] = turn++;
}

turn++;
let spokenNumber = 0;
while (turn <= 2020) {
  if (numbersSpoken[spokenNumber]) {
    const differenceLastSpokenToMostRecent = (turn - 1) - numbersSpoken[spokenNumber];
    numbersSpoken[spokenNumber] = turn - 1;
    if (differenceLastSpokenToMostRecent === 0) {
      spokenNumber = 1;
    } else {
      spokenNumber = differenceLastSpokenToMostRecent;
    }
  } else {
    numbersSpoken[spokenNumber] = turn - 1;
    spokenNumber = 0;
  }

  turn++;
}

console.log(spokenNumber);

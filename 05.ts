// Day 5: Binary Boarding
// https://adventofcode.com/2020/day/5

import { Utils } from './utils';

const lines = Utils.parseFile('./inputs/05.txt');

const seatIds: number[] = [];

for (const line of lines) {
  const row = calculateRowOrColumn(line.substring(0, 7), 0, 127);
  const column = calculateRowOrColumn(line.substring(7, line.length), 0, 7);
  seatIds.push(row * 8 + column);
}

console.log(Math.max(...seatIds));

function calculateRowOrColumn(characters: string, min: number, max: number): number {
  let value: number;
  for (let i = 0; i < characters.length; i++) {
    if (i === characters.length - 1) {
      characters[i] === 'F' || characters[i] === 'L' ? value = min : value = max;
      break;
    }

    const range = max - min;
    if (characters[i] === 'F' || characters[i] === 'L') {
      max -= Math.ceil(range / 2);
    } else {
      min += Math.ceil(range / 2);
    }
  }

  return value;
}

// Day 8: Handheld Halting
// https://adventofcode.com/2020/day/8

import { Utils } from './utils';

const instructions = Utils.parseFile('./inputs/08.txt');

let accumulator = 0;
const ranInstructions: Record<number, boolean> = {};
for (let i = 0; i < instructions.length; i) {
  const instruction = instructions[i].split(' ');
  const operation = instruction[0];
  const sign = instruction[1].substr(0, 1);
  const num = +instruction[1].substring(1, instruction[1].length);

  if (!ranInstructions[i]) {
    ranInstructions[i] = true;
  } else {
    break;
  }

  switch (operation) {
    case 'acc':
      sign === '+' ? accumulator += num : accumulator -= num;
      i++;
      break;
    case 'jmp':
      sign === '+' ? i += num : i -= num;
      break;
    case 'nop':
      i++;
      break;
  }
}

console.log(accumulator);

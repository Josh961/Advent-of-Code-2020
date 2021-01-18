// Day 14: Docking Data
// https://adventofcode.com/2020/day/14

import { Utils } from './utils';

const lines = Utils.parseFile('./inputs/14.txt');

const mem: Record<string, number> = {};
let mask;
for (const line of lines) {
  const splitLine = line.split(' = ');
  const leftHand = splitLine[0];
  const rightHand = splitLine[1];

  if (leftHand === 'mask') {
    mask = rightHand;
  } else {
    const value = calculateValueWithMask(+rightHand, mask);
    const memoryAddress = leftHand.substring(4, leftHand.length - 1);
    mem[memoryAddress] = value;
  }
}

console.log(Object.values(mem).reduce((a, b) => a + b));

function calculateValueWithMask(num: number, mask: string): number {
  const binary = num.toString(2).padStart(mask.length, '0');
  const binaryArray = [...binary];

  for (let i = 0; i < binaryArray.length; i++) {
    if (mask[i] === 'X') { continue; }
    else if (mask[i] === '0') { binaryArray[i] = '0'; }
    else { binaryArray[i] ='1'; }
  }

  return parseInt(binaryArray.join(''), 2);
}

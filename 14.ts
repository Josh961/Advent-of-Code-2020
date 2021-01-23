// Day 14: Docking Data
// https://adventofcode.com/2020/day/14

import { Utils } from './utils';

const lines = Utils.parseFile('./inputs/14.txt');

let mem: Record<string, number> = {};
let mask;
for (const line of lines) {
  const splitLine = line.split(' = ');
  const leftHand = splitLine[0];
  const rightHand = splitLine[1];

  if (leftHand === 'mask') {
    mask = rightHand;
  } else {
    const value = calculateValueWithMask(+rightHand, mask);
    const address = leftHand.substring(4, leftHand.length - 1);
    mem[address] = value;
  }
}

console.log(Object.values(mem).reduce((a, b) => a + b));

mem = {};
for (const line of lines) {
  const splitLine = line.split(' = ');
  const leftHand = splitLine[0];
  const rightHand = splitLine[1];

  if (leftHand === 'mask') {
    mask = rightHand;
  } else {
    const value = +rightHand;
    const address = +leftHand.substring(4, leftHand.length - 1);
    const binary = address.toString(2).padStart(mask.length, '0');
    const binaryArray = [...binary];

    for (let i = 0; i < binaryArray.length; i++) {
      if (mask[i] === 'X') { binaryArray[i] = 'X'; }
      else if (mask[i] === '1') { binaryArray[i] = '1'; }
    }

    dfs(binaryArray, 0, value, mem);
  }
}

console.log(Object.values(mem).reduce((a, b) => a + b));

function calculateValueWithMask(num: number, mask: string): number {
  const binary = num.toString(2).padStart(mask.length, '0');
  const binaryArray = [...binary];

  for (let i = 0; i < binaryArray.length; i++) {
    if (mask[i] === '0') { binaryArray[i] = '0'; }
    else if (mask[i] === '1') { binaryArray[i] = '1'; }
  }

  return parseInt(binaryArray.join(''), 2);
}

function dfs(binary: string[], index: number, value: number, mem: Record<string, number>): void {
  if (index === 35) {
    if (binary[index] === 'X') {
      binary[index] = '0';
      let address = parseInt(binary.join(''), 2);
      mem[address] = value;
      binary[index] = '1';
      address = parseInt(binary.join(''), 2);
      mem[address] = value;
    } else {
      const address = parseInt(binary.join(''), 2);
      mem[address] = value;
    }
    return;
  }

  if (binary[index] === 'X') {
    const nextIndex = index;
    const binaryCopy = [...binary];

    binary[index] = '0';
    dfs(binary, nextIndex, value, mem);
    binaryCopy[index] = '1';
    dfs(binaryCopy, nextIndex, value, mem);
  } else {
    dfs(binary, ++index, value, mem);
  }
}

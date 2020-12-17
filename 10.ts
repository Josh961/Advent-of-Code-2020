// Day 10: Adapter Array
// https://adventofcode.com/2020/day/10

import { Utils } from './utils';

const joltages = Utils.parseNumbersFromFile('./inputs/10.txt');
joltages.push(0);
joltages.sort((a, b) => a - b);

let oneJoltDifferences = 0;
let threeJoltDifferences = 0;
for (let i = 1; i < joltages.length; i++) {
  const difference = joltages[i] - joltages[i - 1];
  if (difference === 1) {
    oneJoltDifferences++;
  } else if (difference === 3) {
    threeJoltDifferences++;
  }

  if (i === joltages.length - 1) { threeJoltDifferences++; }
}

console.log(oneJoltDifferences * threeJoltDifferences);

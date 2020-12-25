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

const memo: number[] = [];
memo[0] = 1;
for (let i = 1; i < joltages.length; i++) {
  let pathsToAdapter = 0;
  if (joltages[i] - 1 === joltages[i - 1]) {
    pathsToAdapter++;
  }
  if (joltages[i] - 2 === joltages[i - 1] || joltages[i] - 2 === joltages[i - 2]) {
    pathsToAdapter++;
  }
  if (joltages[i] - 3 === joltages[i - 1] || joltages[i] - 3 === joltages[i - 2] || joltages[i] - 3 === joltages[i - 3]) {
    pathsToAdapter++;
  }

  memo[i] = pathsToAdapter === 1 ? memo[i - 1] : pathsToAdapter === 2 ? memo[i - 1] + memo[i - 2] : memo[i - 1] + memo[i - 2] + memo[i - 3];
}

console.log(Math.max(...memo));

// Day 3: Toboggan Trajectory
// https://adventofcode.com/2020/day/3

import { Utils } from './utils';

const lines = Utils.parseFile('./inputs/03.txt');

let treeCount = 0;
let index = 0;
for (const line of lines) {
  if (line.charAt(index) === '#') {
    treeCount++;
  }

  if (index + 3 <= 30) {
    index += 3;
  } else {
    index = ((index + 3) % 30) - 1;
  }
}

console.log(treeCount);

const slopeOneTreeCount = calculateNumTreesEncountered(1, 1);
const slopeTwoTreeCount = calculateNumTreesEncountered(3, 1);
const slopeThreeTreeCount = calculateNumTreesEncountered(5, 1);
const slopeFourTreeCount = calculateNumTreesEncountered(7, 1);
const slopeFiveTreeCount = calculateNumTreesEncountered(1, 2);

console.log(slopeOneTreeCount * slopeTwoTreeCount * slopeThreeTreeCount * slopeFourTreeCount * slopeFiveTreeCount);

function calculateNumTreesEncountered(deltaX: number, deltaY: number): number {
  let treeCount = 0;
  let index = 0;
  for (let i = 0; i < lines.length; i++) {
    if (i < deltaY && i !== 0) { continue; }
    if (i % deltaY !== 0) { continue; }

    if (lines[i].charAt(index) === '#') {
      treeCount++;
    }

    if (index + deltaX <= 30) {
      index += deltaX;
    } else {
      index = ((index + deltaX) % 30) - 1;
    }
  }

  return treeCount;
}

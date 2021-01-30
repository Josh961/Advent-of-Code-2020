// Day 16: Ticket Translation
// https://adventofcode.com/2020/day/16

import { Utils } from './utils';

const notes = Utils.parseFileDelimitedByReturns('./inputs/16.txt');

const ranges = notes[0].split(/[\r\n]+/);
const myTicket = notes[1].split(/[\r\n]+/)[1].split(',');
const nearbyTickets = notes[2].split(/[\r\n]+/).slice(1, notes[2].length);

const validValues: number[] = [];

for (const range of ranges) {
  const splitRange = range.split(' ');
  const firstRange = splitRange[1];
  const secondRange = splitRange[3];
  pushValidValues(validValues, firstRange);
  pushValidValues(validValues, secondRange);
}

const uniqueValues = [...new Set(validValues)].sort((a, b) => a - b);
const invalidTickets: number[] = [];

for (const nearbyTicket of nearbyTickets) {
  const values = nearbyTicket.split(',').map(x => +x);
  for (const value of values) {
    if (!binarySearch(uniqueValues, value)) {
      invalidTickets.push(value);
    }
  }
}

console.log(invalidTickets.reduce((a, b) => a + b));

function pushValidValues(validValues: number[], range: string): void {
  const minMax = range.split('-');
  const min = +minMax[0];
  const max = +minMax[1];
  for (let i = min; i <= max; i++) {
    validValues.push(i);
  }
}

function binarySearch(arr: number[], value: number): boolean {
  let low = 0;
  let high = arr.length;
  while (1 + low < high) {
    const mid = low + ((high - low) >> 1);
    if (arr[mid] === value) { return true; }
    if (value < arr[mid]) {
      high = mid;
    } else {
      low = mid;
    }
  }

  return false;
}

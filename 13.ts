// Day 13: Shuttle Search
// https://adventofcode.com/2020/day/13

import { Utils } from './utils';

const notes = Utils.parseFile('./inputs/13.txt');

const earliestTimestamp = +notes[0];
const busIds = notes[1].split(',').filter(x => x !== 'x').map(x => +x);

let earliestBusId: number;
let earliestDeparture = Number.MAX_SAFE_INTEGER;
for (const busId of busIds) {
  const currEarliestDeparture = Math.ceil(earliestTimestamp / busId) * busId;
  if (currEarliestDeparture < earliestDeparture) {
    earliestDeparture = currEarliestDeparture;
    earliestBusId = busId;
  }
}

console.log((earliestDeparture - earliestTimestamp) * earliestBusId);

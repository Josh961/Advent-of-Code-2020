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

const busIdsIncludingX = notes[1].split(',');
const firstBusId = busIds[0];
const largestBusId = busIds.sort((a, b) => a - b)[busIds.length - 1];
const distanceLargestToFirst = busIdsIncludingX.findIndex(x => x === largestBusId.toString());

let time = firstBusId;
let earliestTimestampFound = false;
while (!earliestTimestampFound) {
  let currTime = time;
  for (let i = 0; i < busIdsIncludingX.length; i++) {
    if (i === busIdsIncludingX.length - 1 && currTime % +busIdsIncludingX[i] === 0) {
      earliestTimestampFound = true;
      break;
    }

    if (busIdsIncludingX[i] === 'x') {
      currTime++;
    } else if (currTime % +busIdsIncludingX[i] === 0) {
      currTime++;
    } else {
      break;
    }
  }

  if (!earliestTimestampFound) {
    let newPossibleTimeFound = false;
    time = Math.ceil(time / largestBusId) * largestBusId;
    while (!newPossibleTimeFound) {
      time += largestBusId;
      if ((time - distanceLargestToFirst) % firstBusId !== 0) {
        continue;
      } else {
        time -= distanceLargestToFirst;
        newPossibleTimeFound = true;
      }
    }
  }
}

console.log(time);

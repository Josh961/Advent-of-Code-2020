// Day 16: Ticket Translation
// https://adventofcode.com/2020/day/16

import { Utils } from './utils';

class Field {
  name: string;
  firstRange: string;
  secondRange: string;
  possibleIndexes: number[];
  uniqueIndex: number;
}

const notes = Utils.parseFileDelimitedByReturns('./inputs/16.txt');

const ticketFields = notes[0].split(/[\r\n]+/);
const myTicket = notes[1].split(/[\r\n]+/)[1].split(',');
const nearbyTickets = notes[2].split(/[\r\n]+/).slice(1, notes[2].length);
const nearbyTicketsArray: number[][] = [];
for (const nearbyTicket of nearbyTickets) {
  nearbyTicketsArray.push(nearbyTicket.split(',').map(x => +x));
}

const validValues: number[] = [];

for (const ticketField of ticketFields) {
  const splitField = ticketField.split(/:|\sor\s/);
  const firstRange = splitField[1];
  const secondRange = splitField[2];
  pushValidValues(validValues, firstRange);
  pushValidValues(validValues, secondRange);
}

const uniqueValues = [...new Set(validValues)].sort((a, b) => a - b);
const invalidTickets: number[] = [];
const invalidIndexes: number[] = [];

for (let i = 0; i < nearbyTicketsArray.length; i++) {
  for (let j = 0; j < nearbyTicketsArray[i].length; j++) {
    const value = nearbyTicketsArray[i][j];
    if (!binarySearch(uniqueValues, value)) {
      invalidTickets.push(value);
      invalidIndexes.push(i);
    }
  }
}

console.log(invalidTickets.reduce((a, b) => a + b));

for (let i = invalidIndexes.length - 1; i >= 0; i--) {
  nearbyTicketsArray.splice(invalidIndexes[i], 1);
}

const fields: Field[] = [];
for (const ticketField of ticketFields) {
  const splitField = ticketField.split(/:|\sor\s/);
  const name = splitField[0];
  const firstRange = splitField[1];
  const secondRange = splitField[2];
  fields.push({
    name,
    firstRange,
    secondRange,
    possibleIndexes: [],
    uniqueIndex: -1
  });
}

findIndexesForFields(fields, nearbyTicketsArray);
fields.sort((a, b) => a.possibleIndexes.length - b.possibleIndexes.length)

const assignedIndexes: number[] = [];
findUniqueIndexForFields(fields, assignedIndexes, 0);

console.log(fields.filter(x => x.name.startsWith('departure')).map(x => x.uniqueIndex).reduce((a, b) => a * +myTicket[b], 1));

function findIndexesForFields(fields: Field[], nearbyTicketsArray: number[][]): void {
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    for (let j = 0; j < fields.length; j++) {
      for (let k = 0; k < nearbyTicketsArray.length; k++) {
        const value = nearbyTicketsArray[k][j];
        if (!valueWithinRange(field.firstRange, value) && !valueWithinRange(field.secondRange, value)) {
          break;
        }

        if (k === nearbyTicketsArray.length - 1) {
          field.possibleIndexes.push(j);
        }
      }
    }
  }
}

function findUniqueIndexForFields(fields: Field[], assignedIndexes: number[], currentIndex: number): boolean {
  const field = fields[currentIndex];
  for (const index of field.possibleIndexes) {
    if (assignedIndexes.includes(index)) { continue; }

    field.uniqueIndex = index;
    assignedIndexes.push(index);
    if (currentIndex === fields.length - 1) {
      return true;
    } else if (!findUniqueIndexForFields(fields, assignedIndexes, currentIndex + 1)) {
      assignedIndexes.splice(assignedIndexes.findIndex(x => x === index), 1);
      field.uniqueIndex = -1;
    } else {
      return true;
    }
  }

  return false;
}

function valueWithinRange(range: string, value: number): boolean {
  const minMax = range.split('-');
  const min = +minMax[0];
  const max = +minMax[1];
  return min <= value && value <= max;
}

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

// Day 11: Seating System
// https://adventofcode.com/2020/day/11

import { Utils } from './utils';

const seatsOne: string[][] = [];
const seatsTwo: string[][] = [];

const lines = Utils.parseFile('./inputs/11.txt');
for (const line of lines) {
  seatsOne.push(line.split(''));
  seatsTwo.push(line.split(''));
}

let seatsChangingState = true;
while (seatsChangingState) {
  seatsChangingState = false;
  const toOccupy: string[] = [];
  const toEmpty: string[] = [];
  for (let i = 0; i < seatsOne.length; i++) {
    for (let j = 0; j < seatsOne[i].length; j++) {
      if (seatsOne[i][j] === 'L' && adjacentSeatsEmpty(seatsOne, i, j)) {
        seatsChangingState = true;
        toOccupy.push(`${i.toString()},${j.toString()}`);
      } else if (seatsOne[i][j] === '#' && fourAdjacentSeatsOccupied(seatsOne, i, j)) {
        seatsChangingState = true;
        toEmpty.push(`${i.toString()},${j.toString()}`);
      }
    }
  }
  markSeats(seatsOne, toOccupy, true);
  markSeats(seatsOne, toEmpty, false);
}

console.log(countOccupiedSeats(seatsOne));

seatsChangingState = true;
while (seatsChangingState) {
  seatsChangingState = false;
  const toOccupy: string[] = [];
  const toEmpty: string[] = [];
  for (let i = 0; i < seatsTwo.length; i++) {
    for (let j = 0; j < seatsTwo[i].length; j++) {
      if (seatsTwo[i][j] === 'L' && visibleSeatsEmpty(seatsTwo, i, j)) {
        seatsChangingState = true;
        toOccupy.push(`${i.toString()},${j.toString()}`);
      } else if (seatsTwo[i][j] === '#' && fiveVisibleSeatsOccupied(seatsTwo, i, j)) {
        seatsChangingState = true;
        toEmpty.push(`${i.toString()},${j.toString()}`);
      }
    }
  }
  markSeats(seatsTwo, toOccupy, true);
  markSeats(seatsTwo, toEmpty, false);
}

console.log(countOccupiedSeats(seatsTwo));

function adjacentSeatsEmpty(seats: string[][], i: number, j: number): boolean {
  return ((seats[i - 1]||[])[j - 1] === undefined || (seats[i - 1][j - 1] === 'L' || seats[i - 1][j - 1] === '.')) &&
    ((seats[i - 1]||[])[j] === undefined || (seats[i - 1][j] === 'L' || seats[i - 1][j] === '.')) &&
    ((seats[i - 1]||[])[j + 1] === undefined || (seats[i - 1][j + 1] === 'L' || seats[i - 1][j + 1] === '.')) &&
    ((seats[i]||[])[j - 1] === undefined || (seats[i][j - 1] === 'L' || seats[i][j - 1] === '.')) &&
    ((seats[i]||[])[j + 1] === undefined || (seats[i][j + 1] === 'L' || seats[i][j + 1] === '.')) &&
    ((seats[i + 1]||[])[j - 1] === undefined || (seats[i + 1][j - 1] === 'L' || seats[i + 1][j - 1] === '.')) &&
    ((seats[i + 1]||[])[j] === undefined || (seats[i + 1][j] === 'L' || seats[i + 1][j] === '.')) &&
    ((seats[i + 1]||[])[j + 1] === undefined || (seats[i + 1][j + 1] === 'L' || seats[i + 1][j + 1] === '.'));
}

function fourAdjacentSeatsOccupied(seats: string[][], i: number, j: number): boolean {
  let occupiedSeats = 0;
  if ((seats[i - 1]||[])[j - 1] !== undefined && seats[i - 1][j - 1] === '#') { occupiedSeats++; }
  if ((seats[i - 1]||[])[j] !== undefined && seats[i - 1][j] === '#') { occupiedSeats++; }
  if ((seats[i - 1]||[])[j + 1] !== undefined && seats[i - 1][j + 1] === '#') { occupiedSeats++; }
  if ((seats[i]||[])[j - 1] !== undefined && seats[i][j - 1] === '#') { occupiedSeats++; }
  if ((seats[i]||[])[j + 1] !== undefined && seats[i][j + 1] === '#') { occupiedSeats++; }
  if ((seats[i + 1]||[])[j - 1] !== undefined && seats[i + 1][j - 1] === '#') { occupiedSeats++; }
  if ((seats[i + 1]||[])[j] !== undefined && seats[i + 1][j] === '#') { occupiedSeats++; }
  if ((seats[i + 1]||[])[j + 1] !== undefined && seats[i + 1][j + 1] === '#') { occupiedSeats++; }

  return occupiedSeats >= 4;
}


function visibleSeatsEmpty(seats: string[][], i: number, j: number): boolean {
  return topLeftEmpty(seats, i, j) &&
    topEmpty(seats, i, j) &&
    topRightEmpty(seats, i, j) &&
    leftEmpty(seats, i, j) &&
    rightEmpty(seats, i, j) &&
    bottomLeftEmpty(seats, i, j) &&
    bottomEmpty(seats, i, j) &&
    bottomRightEmpty(seats, i, j);
}

function fiveVisibleSeatsOccupied(seats: string[][], i: number, j: number): boolean {
  let occupiedSeats = 0;
  if (!topLeftEmpty(seats, i, j)) { occupiedSeats++; }
  if (!topEmpty(seats, i, j)) { occupiedSeats++; }
  if (!topRightEmpty(seats, i, j)) { occupiedSeats++; }
  if (!leftEmpty(seats, i, j)) { occupiedSeats++; }
  if (!rightEmpty(seats, i, j)) { occupiedSeats++; }
  if (!bottomLeftEmpty(seats, i, j)) { occupiedSeats++; }
  if (!bottomEmpty(seats, i, j)) { occupiedSeats++; }
  if (!bottomRightEmpty(seats, i, j)) { occupiedSeats++; }

  return occupiedSeats >= 5;
}

function topLeftEmpty(seats: string[][], i: number, j: number): boolean {
  if ((seats[i--]||[])[j--] === undefined) { return true; }

  for (; i >= 0 && j >= 0; i--, j--) {
    if (seats[i][j] === 'L') { return true; }
    else if (seats[i][j] === '#') { return false; }
  }
  return true;
}

function topEmpty(seats: string[][], i: number, j: number): boolean {
  if ((seats[i--]||[])[j] === undefined) { return true; }

  for (; i >= 0; i--) {
    if (seats[i][j] === 'L') { return true; }
    else if (seats[i][j] === '#') { return false; }
  }
  return true;
}

function topRightEmpty(seats: string[][], i: number, j: number): boolean {
  if ((seats[i--]||[])[j++] === undefined) { return true; }

  for (; i >= 0 && j < seats[i].length; i--, j++) {
    if (seats[i][j] === 'L') { return true; }
    else if (seats[i][j] === '#') { return false; }
  }
  return true;
}

function leftEmpty(seats: string[][], i: number, j: number): boolean {
  if ((seats[i]||[])[j--] === undefined) { return true; }

  for (; j >= 0; j--) {
    if (seats[i][j] === 'L') { return true; }
    else if (seats[i][j] === '#') { return false; }
  }
  return true;
}

function rightEmpty(seats: string[][], i: number, j: number): boolean {
  if ((seats[i]||[])[j++] === undefined) { return true; }

  for (; j < seats[i].length; j++) {
    if (seats[i][j] === 'L') { return true; }
    else if (seats[i][j] === '#') { return false; }
  }
  return true;
}

function bottomLeftEmpty(seats: string[][], i: number, j: number): boolean {
  if ((seats[i++]||[])[j--] === undefined) { return true; }

  for (; i < seats.length && j >= 0; i++, j--) {
    if (seats[i][j] === 'L') { return true; }
    else if (seats[i][j] === '#') { return false; }
  }
  return true;
}

function bottomEmpty(seats: string[][], i: number, j: number): boolean {
  if ((seats[i++]||[])[j] === undefined) { return true; }

  for (; i < seats.length; i++) {
    if (seats[i][j] === 'L') { return true; }
    else if (seats[i][j] === '#') { return false; }
  }
  return true;
}

function bottomRightEmpty(seats: string[][], i: number, j: number): boolean {
  if ((seats[i++]||[])[j++] === undefined) { return true; }

  for (; i < seats.length && j < seats[i].length; i++, j++) {
    if (seats[i][j] === 'L') { return true; }
    else if (seats[i][j] === '#') { return false; }
  }
  return true;
}

function markSeats(seats: string[][], markedSeats: string[], occupy: boolean): void {
  for (const value of markedSeats) {
    const coordinates = value.split(',');
    const i = +coordinates[0];
    const j = +coordinates[1];
    seats[i][j] = occupy ? '#' : 'L';
  }
}

function countOccupiedSeats(seats: string[][]): number {
  let occupiedSeats = 0;
  for (let i = 0; i < seats.length; i++) {
    for(let j = 0; j < seats[i].length; j++) {
      if (seats[i][j] === '#') { occupiedSeats++; }
    }
  }

  return occupiedSeats;
}

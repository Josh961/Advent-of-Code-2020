// Day 11: Seating System
// https://adventofcode.com/2020/day/11

import { Utils } from './utils';

const seats: string[][] = [];

const lines = Utils.parseFile('./inputs/11.txt');
for (const line of lines) {
  seats.push(line.split(''));
}

let seatsChangingState = true;
while (seatsChangingState) {
  seatsChangingState = false;
  const toOccupy: string[] = [];
  const toEmpty: string[] = [];
  for (let i = 0; i < seats.length; i++) {
    for (let j = 0; j < seats[i].length; j++) {
      if (seats[i][j] === 'L' && adjacentSeatsEmpty(seats, i, j)) {
        seatsChangingState = true;
        toOccupy.push(`${i.toString()},${j.toString()}`);
      } else if (seats[i][j] === '#' && fourAdjacentSeatsOccupied(seats, i, j)) {
        seatsChangingState = true;
        toEmpty.push(`${i.toString()},${j.toString()}`);
      }
    }
  }
  markSeats(toOccupy, true);
  markSeats(toEmpty, false);
}

console.log(countOccupiedSeats(seats));

function markSeats(arr: string[], occupy: boolean): void {
  for (const value of arr) {
    const coordinates = value.split(',');
    const i = +coordinates[0];
    const j = +coordinates[1];
    seats[i][j] = occupy ? '#' : 'L';
  }
}

function adjacentSeatsEmpty(seats: string[][], i: number, j: number): boolean {
  if (
    ((seats[i - 1]||[])[j - 1] === undefined || (seats[i - 1][j - 1] === 'L' || seats[i - 1][j - 1] === '.')) &&
    ((seats[i - 1]||[])[j] === undefined || (seats[i - 1][j] === 'L' || seats[i - 1][j] === '.')) &&
    ((seats[i - 1]||[])[j + 1] === undefined || (seats[i - 1][j + 1] === 'L' || seats[i - 1][j + 1] === '.')) &&
    ((seats[i]||[])[j - 1] === undefined || (seats[i][j - 1] === 'L' || seats[i][j - 1] === '.')) &&
    ((seats[i]||[])[j + 1] === undefined || (seats[i][j + 1] === 'L' || seats[i][j + 1] === '.')) &&
    ((seats[i + 1]||[])[j - 1] === undefined || (seats[i + 1][j - 1] === 'L' || seats[i + 1][j - 1] === '.')) &&
    ((seats[i + 1]||[])[j] === undefined || (seats[i + 1][j] === 'L' || seats[i + 1][j] === '.')) &&
    ((seats[i + 1]||[])[j + 1] === undefined || (seats[i + 1][j + 1] === 'L' || seats[i + 1][j + 1] === '.'))
  ) {
    return true;
  } else {
    return false;
  }
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

function countOccupiedSeats(seats: string[][]): number {
  let occupiedSeats = 0;
  for (let i = 0; i < seats.length; i++) {
    for(let j = 0; j < seats[i].length; j++) {
      if (seats[i][j] === '#') { occupiedSeats++; }
    }
  }

  return occupiedSeats;
}

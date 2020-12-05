// Day 2: Password Philosophy
// https://adventofcode.com/2020/day/2

import { Utils } from './utils';

const lines = Utils.parseFile('./inputs/02.txt');

let validPasswords = 0;
for (const line of lines) {
  const parsedLine = /(\d+)-(\d+)\s([a-z]):\s([a-z]+)/.exec(line);
  const min = +parsedLine[1];
  const max = +parsedLine[2];
  const letter = parsedLine[3];
  const password = parsedLine[4];

  let letterCount = 0;
  for (const character of password) {
    if (letter === character) { letterCount++; }
  }

  if (letterCount >= min && letterCount <= max) { validPasswords++; }
}

console.log(validPasswords);

validPasswords = 0;
for (const line of lines) {
  const parsedLine = /(\d+)-(\d+)\s([a-z]):\s([a-z]+)/.exec(line);
  const positionOne = +parsedLine[1];
  const positionTwo = +parsedLine[2];
  const letter = parsedLine[3];
  const password = parsedLine[4];

  if ((password.charAt(positionOne - 1) === letter) !== (password.charAt(positionTwo - 1) === letter)) { validPasswords++; }
}

console.log(validPasswords);

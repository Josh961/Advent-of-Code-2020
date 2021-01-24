// Day 15: Rambunctious Recitation
// https://adventofcode.com/2020/day/15

import { Utils } from './utils';

const numbers = Utils.parseFile('./inputs/15.txt')[0].split(',');

playGame(2020, numbers);
playGame(30000000, numbers);

function playGame(turnsToPlay: number, startingNumbers: string[]): void {
  const numbersSpoken: Record<string, number> = {};
  let turn = 1;
  for (const number of startingNumbers) {
    numbersSpoken[number] = turn++;
  }

  turn++;
  let spokenNumber = 0;
  while (turn <= turnsToPlay) {
    if (numbersSpoken[spokenNumber]) {
      const differenceLastSpokenToMostRecent = (turn - 1) - numbersSpoken[spokenNumber];
      numbersSpoken[spokenNumber] = turn - 1;
      spokenNumber = differenceLastSpokenToMostRecent === 0 ? 1 : differenceLastSpokenToMostRecent;
    } else {
      numbersSpoken[spokenNumber] = turn - 1;
      spokenNumber = 0;
    }

    turn++;
  }

  console.log(spokenNumber);
}

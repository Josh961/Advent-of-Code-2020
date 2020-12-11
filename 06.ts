// Day 6: Custom Customs
// https://adventofcode.com/2020/day/6

import { Utils } from './utils';

const groups = Utils.parseFileDelimitedByReturns('./inputs/06.txt');

let sumOfAnswers = 0;
for (const group of groups) {
  const line = group.replace(/[\r\n]+/g, '');
  let uniqueAnswers = 0;
  [...line].reduce((res, char) => {
    res[char] = res[char] ? res[char] + 1 : 1;
    if (res[char] === 1) {
      uniqueAnswers++;
    }
    return res;
  }, {} as Record<string, number>);
  sumOfAnswers += uniqueAnswers;
}

console.log(sumOfAnswers);

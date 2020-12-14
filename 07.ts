// Day 7: Handy Haversacks
// https://adventofcode.com/2020/day/7

import { Utils } from './utils';

const rules = Utils.parseFile('./inputs/07.txt');

const bagMap: Record<string, string[]> = {};
for (const rule of rules) {
  const bags = rule.replace(/bags|bag|\d|\./g, '').split('contain');
  const outerBag = bags[0].trim();
  const innerBags = bags[1].split(',').map(x => x.trim());
  if (innerBags[0] !== 'no other') {
    bagMap[outerBag] = innerBags;
  }
}

let containShinyGold = 0;
for (const outerBag of Object.keys(bagMap)) {
  const shinyGoldFound = dfs(bagMap, outerBag);
  if (shinyGoldFound) { containShinyGold++; }
}

console.log(containShinyGold);

function dfs(map: Record<string, string[]>, key: string): boolean {
  for (const bag of map[key]) {
    if (bag === 'shiny gold') {
      return true;
    } else if (map[bag]) {
      const shinyGoldFound = dfs(map, bag);
      if (shinyGoldFound) { return true; }
    }
  }

  return false;
}

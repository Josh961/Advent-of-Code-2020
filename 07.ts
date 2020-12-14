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
  const shinyGoldFound = containDfs(bagMap, outerBag);
  if (shinyGoldFound) { containShinyGold++; }
}

console.log(containShinyGold);

const bagWithAmountsMap: Record<string, string[]> = {};
for (const rule of rules) {
  const bags = rule.replace(/bags|bag|\./g, '').split('contain');
  const outerBag = bags[0].replace(/\d/g, '').trim();
  const innerBags = bags[1].split(',').map(x => x.trim());
  if (innerBags[0] !== 'no other') {
    bagWithAmountsMap[outerBag] = innerBags;
  }
}

const shinyGoldContains = amountDfs(bagWithAmountsMap, 'shiny gold');

console.log(shinyGoldContains);

function containDfs(map: Record<string, string[]>, key: string): boolean {
  for (const bag of map[key]) {
    if (bag === 'shiny gold') {
      return true;
    } else if (map[bag]) {
      const shinyGoldFound = containDfs(map, bag);
      if (shinyGoldFound) { return true; }
    }
  }

  return false;
}

function amountDfs(map: Record<string, string[]>, key: string): number {
  let total = 0;
  for (const bag of map[key]) {
    const amount = +bag.substr(0, 1);
    const color = bag.substring(2, bag.length);
    if (map[color]) {
      total += amount;
      for (let i = 0; i < amount; i++) {
        total += amountDfs(map, color);
      }
    } else {
      total += amount;
    }
  }

  return total;
}

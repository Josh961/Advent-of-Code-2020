// Day 4: Passport Processing
// https://adventofcode.com/2020/day/4

import { Utils } from './utils';

const lines = Utils.parseFileDelimitedByReturns('./inputs/04.txt');

let validPassports = 0;
for (const line of lines) {
  const keys = line.split(/[\r\n\s]+/);
  const passport = {
    byr: getValue(keys, 'byr'),
    iyr: getValue(keys, 'iyr'),
    eyr: getValue(keys, 'eyr'),
    hgt: getValue(keys, 'hgt'),
    hcl: getValue(keys, 'hcl'),
    ecl: getValue(keys, 'ecl'),
    pid: getValue(keys, 'pid'),
    cid: getValue(keys, 'cid')
  };

  if (passportValid(passport)) {
    validPassports++;
  }
}

console.log(validPassports);

function getValue(keys: string[], key: string): string {
  const pair = keys.find(x => x.startsWith(key, 0));
  return pair !== undefined ? pair.split(':')[1] : null;
}

function passportValid(passport: any) {
  if (
    passport.byr === null ||
    passport.iyr === null ||
    passport.eyr === null ||
    passport.hgt === null ||
    passport.hcl === null ||
    passport.ecl === null ||
    passport.pid === null
  ) {
    return false;
  } else {
    return true;
  }
}

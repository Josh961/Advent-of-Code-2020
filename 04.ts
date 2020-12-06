// Day 4: Passport Processing
// https://adventofcode.com/2020/day/4

import { Utils } from './utils';

const lines = Utils.parseFileDelimitedByReturns('./inputs/04.txt');

let validPassports = 0;
for (const line of lines) {
  const keys = line.split(/[\r\n\s]+/);
  const passport: Record<string, string> = {
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

validPassports = 0;
for (const line of lines) {
  const keys = line.split(/[\r\n\s]+/);
  const passport: Record<string, string> = {
    byr: getValue(keys, 'byr'),
    iyr: getValue(keys, 'iyr'),
    eyr: getValue(keys, 'eyr'),
    hgt: getValue(keys, 'hgt'),
    hcl: getValue(keys, 'hcl'),
    ecl: getValue(keys, 'ecl'),
    pid: getValue(keys, 'pid'),
    cid: getValue(keys, 'cid')
  };

  if (passportValid(passport) && valuesValid(passport)) {
    validPassports++;
  }
}

console.log(validPassports);

function getValue(keys: string[], key: string): string {
  const pair = keys.find(x => x.startsWith(key, 0));
  return pair !== undefined ? pair.split(':')[1] : null;
}

function passportValid(passport: Record<string, string>): boolean {
  return !passport.byr || !passport.iyr || !passport.eyr || !passport.hgt || !passport.hcl || !passport.ecl || !passport.pid ? false : true;
}

function valuesValid(passport: Record<string, string>):boolean {
  if (!(+passport.byr >= 1920 && +passport.byr <= 2002)) { return false; }
  if (!(+passport.iyr >= 2010 && +passport.iyr <= 2020)) { return false; }
  if (!(+passport.eyr >= 2020 && +passport.eyr <= 2030)) { return false; }

  if (passport.hgt.endsWith('in')) {
    const height = +passport.hgt.substr(0, 2);
    if (!(height >= 59 && height <= 76)) { return false; }
  } else if (passport.hgt.endsWith('cm')) {
    const height = +passport.hgt.substr(0, 3);
    if (!(height >= 150 && height <= 193)) { return false; }
  } else {
    return false;
  }

  if (!/^#[a-f0-9]{6}$/.test(passport.hcl)) { return false; }
  if (!/^amb|blu|brn|gry|grn|hzl|oth$/.test(passport.ecl)) { return false; }
  if (!/^[0-9]{9}$/.test(passport.pid)) { return false; }

  return true;
}

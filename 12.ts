// Day 12: Rain Risk
// https://adventofcode.com/2020/day/12

import { Utils } from './utils';

const instructions = Utils.parseFile('./inputs/12.txt');

const directions = ['N', 'E', 'S', 'W'];
let currentDirection = 'E';
let verticalDistance = 0;
let horizontalDistance = 0;
for (const instruction of instructions) {
  const action = instruction.substr(0, 1);
  const value = +instruction.substring(1, instruction.length);

  switch (action) {
    case 'N': {
      verticalDistance += value;
      break;
    }
    case 'S': {
      verticalDistance -= value;
      break;
    }
    case 'E': {
      horizontalDistance += value;
      break;
    }
    case 'W': {
      horizontalDistance -= value;
      break;
    }
    case 'L': {
      const turns = value / 90;
      let index = directions.findIndex(x => x === currentDirection);
      index = index - turns >= 0 ? index - turns : directions.length + (index - turns);
      currentDirection = directions[index];
      break;
    }
    case 'R': {
      const turns = value / 90;
      const index = directions.findIndex(x => x === currentDirection);
      currentDirection = directions[(turns + index) % directions.length];
      break;
    }
    case 'F': {
      if (currentDirection === 'N') { verticalDistance += value; }
      else if (currentDirection === 'S') { verticalDistance -= value; }
      else if (currentDirection === 'E') { horizontalDistance += value; }
      else if (currentDirection === 'W') { horizontalDistance -= value;}
      break;
    }
  }
}

console.log(Math.abs(verticalDistance) + Math.abs(horizontalDistance));

currentDirection = 'E';
verticalDistance = 0;
horizontalDistance = 0;
let waypointVerticalDistance = 1;
let waypointHorizontalDistance = 10;
for (const instruction of instructions) {
  const action = instruction.substr(0, 1);
  const value = +instruction.substring(1, instruction.length);

  switch (action) {
    case 'N': {
      waypointVerticalDistance += value;
      break;
    }
    case 'S': {
      waypointVerticalDistance -= value;
      break;
    }
    case 'E': {
      waypointHorizontalDistance += value;
      break;
    }
    case 'W': {
      waypointHorizontalDistance -= value;
      break;
    }
    case 'L': {
      const turns = value / 90;
      for (let i = 0; i < turns; i++) {
        const previousVerticalDistance = waypointVerticalDistance;
        const previousHorizontalDistance = waypointHorizontalDistance;
        waypointVerticalDistance = previousHorizontalDistance;
        waypointHorizontalDistance = -previousVerticalDistance;
      }
      break;
    }
    case 'R': {
      const turns = value / 90;
      for (let i = 0; i < turns; i++) {
        const previousVerticalDistance = waypointVerticalDistance;
        const previousHorizontalDistance = waypointHorizontalDistance;
        waypointVerticalDistance = -previousHorizontalDistance;
        waypointHorizontalDistance = previousVerticalDistance;
      }
      break;
    }
    case 'F': {
      verticalDistance = verticalDistance + (value * waypointVerticalDistance);
      horizontalDistance = horizontalDistance + (value * waypointHorizontalDistance);
      break;
    }
  }
}

console.log(Math.abs(verticalDistance) + Math.abs(horizontalDistance));

#!/usr/bin/env node

import {
  calculateAllPossibleRolls,
  calculateBestFit,
  numberToAsciiWithSign,
} from "./damageToDice.js";

const printUsage = (error) => {
  console.log(error + "\n");
  console.log("Usage: damageToDice <total damage> [optional damage modifier]");
  console.log("  Example: damageToDice.js 15 3");
  console.log(
    "  If provided, the damage modifier should be included in the total damage."
  );
  console.log("  Average die values are calculated as [sides / 2 + 0.5].");
};

let damage = process.argv[2];
let bonus = process.argv[3] || 0;

if (!damage || isNaN(damage) || damage < 1) {
  printUsage("Total damage must be a number greater than 0.");
  process.exit(1);
}
if (bonus && isNaN(bonus)) {
  printUsage("Damage modifier must be a number.");
  process.exit(1);
}

damage = parseInt(damage, 10);
bonus = parseInt(bonus, 10);

if (damage < 1) {
  printUsage("Total damage must be greater than 0.");
  process.exit(1);
}
if (damage + bonus < 1) {
  printUsage("Total damage + damage modifier must be greater than 0.");
  process.exit(1);
}
if (damage - bonus < 1) {
  printUsage("Total damage - damage modifier must be greater than 0.");
  process.exit(1);
}

const allPossibleRolls = calculateAllPossibleRolls(damage, bonus);
const bestFit = calculateBestFit(damage, bonus);

if (allPossibleRolls.length === 0) {
  console.log("No possible rolls.");
  process.exit(0);
}

console.log(
  `Best fit: ${bestFit.numberOfDice}${bestFit.die.die}${numberToAsciiWithSign(
    bonus
  )} = ${bestFit.numberOfDice * bestFit.die.averageRoll + bonus} ${
    bestFit.percentage === 100 ? "(exact!)" : ""
  }`
);
console.log("----------------------------------------");
console.log("All possible rolls:");
allPossibleRolls.forEach((roll) => {
  console.log(
    `${roll.numberOfDice}${roll.die.die}${numberToAsciiWithSign(bonus)} = ${
      roll.damage
    } (${Math.round(roll.percentage)}% of target damage); min: ${
      roll.numberOfDice * 1 + bonus
    }, max: ${roll.numberOfDice * roll.die.sides + bonus}; most rolls within ${
      roll.standardDeviation.minimum
    }-${roll.standardDeviation.maximum}`
  );
});

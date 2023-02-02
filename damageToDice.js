const diceMap = [
  { die: "d20", averageRoll: 10.5, sides: 20 },
  { die: "d12", averageRoll: 6.5, sides: 12 },
  { die: "d10", averageRoll: 5.5, sides: 10 },
  { die: "d8", averageRoll: 4.5, sides: 8 },
  { die: "d6", averageRoll: 3.5, sides: 6 },
  { die: "d4", averageRoll: 2.5, sides: 4 },
];
export const numberToAsciiWithSign = (number) =>
  number < 0 ? `${number}` : `+${number}`;

export const calculateBestFit = (damage, modifier = 0) => {
  if (modifier > 0) {
    damage -= modifier;
  }
  const bestFit = diceMap.reduce(
    (lowest, die) => {
      const numberOfDice = Math.round(damage / die.averageRoll);
      const damageWithDice = numberOfDice * die.averageRoll + modifier;
      const percentage = Math.round(
        (damageWithDice / (damage + modifier)) * 100
      );
      // If the percentage is closer to 100% than the previous best fit, use this one
      if (Math.abs(percentage - 100) < Math.abs(lowest.percentage - 100)) {
        return {
          die,
          numberOfDice,
          damage: damageWithDice,
          percentage: Math.round((damageWithDice / (damage + modifier)) * 100),
        };
      }
      return lowest;
    },
    { percentage: Infinity }
  );

  return bestFit;
};

export const calculateAllPossibleRolls = (damage, modifier = 0) => {
  if (modifier > 0) {
    damage -= modifier;
  }
  return diceMap
    .map((die) => {
      const numberOfDice = Math.round(damage / die.averageRoll);
      if (numberOfDice === 0) return null;
      return {
        numberOfDice,
        die,
        damage: numberOfDice * die.averageRoll + modifier,
        percentage: Math.round(
          ((numberOfDice * die.averageRoll + modifier) / (damage + modifier)) *
            100
        ),
      };
    })
    .filter(Boolean);
};

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

export const calculateDieRoll = ({ damage, modifier, die }) => {
  const numberOfDice = Math.round(damage / die.averageRoll);
  const damageWithDice = numberOfDice * die.averageRoll + modifier;
  const percentage = (damageWithDice / (damage + modifier)) * 100;
  // From: https://math.stackexchange.com/q/2245194, https://en.wikipedia.org/wiki/Variance#Fair_die
  const standardDeviation = Math.sqrt(
    (numberOfDice * (Math.pow(die.sides, 2) - 1)) / 12
  );
  const minimumWithinStandardDeviation = Math.round(
    numberOfDice * die.averageRoll - standardDeviation
  );
  const maximumWithinStandardDeviation = Math.round(
    numberOfDice * die.averageRoll + standardDeviation
  );
  return {
    numberOfDice,
    die,
    damage: damageWithDice,
    percentage,
    standardDeviation: {
      minimum: minimumWithinStandardDeviation,
      maximum: maximumWithinStandardDeviation,
      standardDeviation,
    },
  };
};

export const calculateBestFit = (damage, modifier = 0) => {
  if (modifier > 0) {
    damage -= modifier;
  }
  const bestFit = diceMap.reduce(
    (lowest, die) => {
      const {
        numberOfDice,
        damage: damageWithDice,
        percentage,
        standardDeviation,
      } = calculateDieRoll({
        damage,
        modifier,
        die,
      });
      // If the percentage is closer to 100% than the previous best fit, use this one
      if (Math.abs(percentage - 100) < Math.abs(lowest.percentage - 100)) {
        return {
          die,
          numberOfDice,
          damage: damageWithDice,
          percentage,
          standardDeviation,
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
      const {
        numberOfDice,
        damage: damageWithDice,
        percentage,
        standardDeviation,
      } = calculateDieRoll({
        damage,
        modifier,
        die,
      });
      if (numberOfDice === 0) return null;
      return {
        numberOfDice,
        die,
        damage: damageWithDice,
        percentage,
        standardDeviation,
      };
    })
    .filter(Boolean);
};

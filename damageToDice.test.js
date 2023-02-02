import { calculateBestFit } from "./damageToDice.js";

test("Best fit for 15 = 6d4", () => {
  expect(calculateBestFit(15)).toEqual({
    damage: 15,
    die: {
      die: "d4",
      averageRoll: 2.5,
      sides: 4,
    },
    numberOfDice: 6,
    percentage: 100,
  });
});

test("Best fit for 16 = 3d10 (not exact)", () => {
  expect(calculateBestFit(16)).toEqual({
    die: { die: "d10", averageRoll: 5.5, sides: 10 },
    numberOfDice: 3,
    damage: 16.5,
    percentage: 103,
  });
});

test("Best fit for 29 (+3 bonus) = 4d12+3", () => {
  expect(calculateBestFit(29, 3)).toEqual({
    die: {
      die: "d12",
      averageRoll: 6.5,
      sides: 12,
    },
    damage: 29,
    numberOfDice: 4,
    percentage: 100,
  });
});

test("Best fit for 89 (-19 bonus) = 16d10 (not exact)", () => {
  expect(calculateBestFit(89, -19)).toEqual({
    die: {
      die: "d10",
      averageRoll: 5.5,
      sides: 10,
    },
    damage: 69,
    numberOfDice: 16,
    percentage: 99,
  });
});

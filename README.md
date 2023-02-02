# damage-to-dice

The 5e Dungeons & Dragons _Monster Manual_ provides average values for the damage outputs of all its monsters, along with a recommended set of dice to roll to obtain a roll with that average value.

But what if:

- You're homebrewing a monster, and the _Dungeon Master's Guide_ unhelpfully tells you that your monster's damage output should be between 39-44? No player wants to be told they take the same amount of damage on every attack. That's what dice are _for_!
- You're quickly creating a monster using the superb 'Monster Manual on a business card' rules from [Blog of Holding](https://www.blogofholding.com/?p=7338), which will likewise give you your monster's damage as a flat number?
- You're tweaking an existing monster, and would like to know what other die rolls approach its average damage, in case you want to reduce the minimum or maximum damage, or simply because you have an inexplicable dislike for d12s?

`damage-to-dice` is for you! Give `damage-to-dice` a total damage value, alongside an optional damage modifier, and it will give you the best fit die roll to hit that value, along with the best fit for each die type, and stats for those dice:

```
$ damage-to-dice 14
Best fit: 4d6+0 = 14 (exact!)
----------------------------------------
All possible rolls:
1d20+0 = 10.5 (75% of target damage); min: 1, max: 20
2d12+0 = 13 (93% of target damage); min: 2, max: 24
2d10+0 = 11 (79% of target damage); min: 2, max: 20
3d8+0 = 13.5 (96% of target damage); min: 3, max: 24
4d6+0 = 14 (100% of target damage); min: 4, max: 24
5d4+0 = 12.5 (89% of target damage); min: 5, max: 20

$ damage-to-dice 27 3
Best fit: 5d8+3 = 25.5
----------------------------------------
All possible rolls:
2d20+3 = 24 (89% of target damage); min: 5, max: 43
3d12+3 = 22.5 (83% of target damage); min: 6, max: 39
4d10+3 = 25 (93% of target damage); min: 7, max: 43
5d8+3 = 25.5 (94% of target damage); min: 8, max: 43
6d6+3 = 24 (89% of target damage); min: 9, max: 39
9d4+3 = 25.5 (94% of target damage); min: 12, max: 39
```

From the results of the second call, you might decide that although your monster deals an average of 25.5 damage with d8s, you might prefer to deal the same damage with a whole heap of d4s, either for effect or because you want to steeply increase the minimum damage value.

## Installation

`damage-to-dice` is available as an NPM package:

```
npm install --global damage-to-dice
```

You can then run the utility from the command line:

```
$ damage-to-dice 15 3
```

# damage-to-dice

The 5e Dungeons & Dragons _Monster Manual_ provides average values for the damage outputs of all its monsters, along with a recommended set of dice to roll to obtain a roll with that average value.

But what if:

- You're homebrewing a monster, and the _Dungeon Master's Guide_ unhelpfully tells you that your monster's damage output should be between 39-44? No player wants to be told they take the same amount of damage on every attack. That's what dice are _for_!
- You're quickly creating a monster using the superb 'Monster Manual on a business card' rules from [Blog of Holding](https://www.blogofholding.com/?p=7338), which will likewise give you your monster's damage as a flat number?
- You're tweaking an existing monster, and would like to know what other die rolls approach its average damage, in case you want to reduce the minimum or maximum damage, or simply because you have an inexplicable dislike for d12s?

`damage-to-dice` is for you! Give `damage-to-dice` a total damage value, alongside an optional damage modifier, and it will give you the best fit die roll to hit that value, along with the best fit for each die type, and stats for those dice:

```
$ damage-to-dice 16
Best fit: 3d10+0 = 16.5
----------------------------------------
All possible rolls:
2d20+0 = 21 (131% of target damage); min: 2, max: 40
2d12+0 = 13 (81% of target damage); min: 2, max: 24
3d10+0 = 16.5 (103% of target damage); min: 3, max: 30
4d8+0 = 18 (113% of target damage); min: 4, max: 32
5d6+0 = 17.5 (109% of target damage); min: 5, max: 30
6d4+0 = 15 (94% of target damage); min: 6, max: 24

$ damage-to-dice 27 3
Best fit: 7d6+3 = 27.5
----------------------------------------
All possible rolls:
2d20+3 = 24 (89% of target damage); min: 5, max: 43
4d12+3 = 29 (107% of target damage); min: 7, max: 51
4d10+3 = 25 (93% of target damage); min: 7, max: 43
5d8+3 = 25.5 (94% of target damage); min: 8, max: 43
7d6+3 = 27.5 (102% of target damage); min: 10, max: 45
10d4+3 = 28 (104% of target damage); min: 13, max: 43
```

From the results of the second call, you might decide that although your monster deals an average of 27.5 damage with d6s, you might prefer to deal just a little more damage with a whole heap of d4s, either for effect or because you want to increase the minimum damage value and ruin your players' days.

## Installation

`damage-to-dice` is available as an NPM package:

```
npm install --global damage-to-dice
```

You can then run the utility from the command line:

```
$ damage-to-dice 15 3
```

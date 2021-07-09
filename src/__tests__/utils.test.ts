//*all pass!

import {
  expressions,
  find,
  mapFind,
  nBitCombos,
  nBitCombosManual,
  sum,
} from "../utils";

describe("utilities tests", () => {
  test("array summer", () => {
    expect(sum([1, 1, 1, 1])).toEqual(4);
  });

  //? testing the combinatorial generators

  let ans2 = ["00", "01", "10", "11"];
  let ans3 = "000 001 010 011 100 101 110 111".split(" ");
  test("nBitCombos with toString", () => {
    expect(nBitCombos(2)).toEqual(ans2);
    expect(nBitCombos(3)).toEqual(ans3);
  });

  test("nBitCombos with arr. counting", () => {
    expect(nBitCombosManual(3)).toEqual(ans3);
    expect(nBitCombosManual(2)).toEqual(ans2);
  });

  //? testing regex functions

  let string = "this is a string, can you see that it is a string?";
  let regex = /is/g;

  test("RegEx find", () => {
    expect(find(string, regex)).toEqual([2, 5, 38]);
    expect(find(string, expressions.vowels)).toEqual([
      2, 5, 8, 13, 19, 22, 23, 24, 27, 28, 32, 35, 38, 41, 46,
    ]);
  });

  regex = /is/g;
  test("RegEx mapFind", () => {
    expect(mapFind(string, regex)).toEqual({
      "2": "is",
      "5": "is",
      "38": "is",
    });
    expect(mapFind(string, expressions.vowels)).toEqual({
      "2": "i",
      "5": "i",
      "8": "a",
      "13": "i",
      "19": "a",
      "22": "y",
      "23": "o",
      "24": "u",
      "27": "e",
      "28": "e",
      "32": "a",
      "35": "i",
      "38": "i",
      "41": "a",
      "46": "i",
    });
  });
});

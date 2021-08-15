import expressions, {
  findAllMatches,
  matchAndMap,
  nBitCombos,
  sum,
} from "../SCAN/utils";

describe("utilities tests", () => {
  test("array summer", () => {
    expect(sum([1, 1, 1, 1])).toEqual(4);
  });

  //? testing the combinatorial generator

  let ans2 = ["00", "01", "10", "11"];
  let ans3 = "000 001 010 011 100 101 110 111".split(" ");
  test("nBitCombos with toString", () => {
    expect(nBitCombos(2)).toEqual(ans2);
    expect(nBitCombos(3)).toEqual(ans3);
  });

  //? testing regex functions

  let string = "this is a string, can you see that it is a string?";
  let regex = /is/g;
  let matchPositions = [
    2, 5, 8, 13, 19, 22, 23, 24, 27, 28, 32, 35, 38, 41, 46,
  ];

  test("RegEx finder", () => {
    expect(findAllMatches(string, regex)).toEqual([2, 5, 38]);
    expect(findAllMatches(string, expressions.vowels)).toEqual(matchPositions);
  });

  regex = /is/g;
  test("RegEx match", () => {
    expect(matchAndMap(string, regex)).toEqual({
      "2": "is",
      "5": "is",
      "38": "is",
    });
    expect(matchAndMap(string, expressions.vowels)).toEqual({
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

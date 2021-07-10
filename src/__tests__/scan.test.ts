import type {
  metaLine,
  quantity,
  scannedLineType,
  sylMap,
} from "src/scanTypes";
import { PresetOptions } from "../utils";
import {
  ScanParagraph,
  scanLine,
  undress,
  preScan,
  postScan,
  hexScan,
  arrToQuantity,
  marryUp,
  insertPunctuation,
} from "../scan";

describe("scan algorithm functionality testing", () => {
  //test if each of the functions in scan.ts *works* in some case
  //none of these are proper stress tests, which would look at edge cases.

  //some vairbles used throughout the testing:
  let AeneidLn1 = "Arma virumque cano Troiae qui primus ab oris";
  let AeneidNatQuants: sylMap = {
    //short for Aeneidln1 natural quantities
    0: "long",
    3: "undefined",
    6: "undefined",
    8: "long",
    12: "undefined",
    15: "undefined",
    17: "long",
    21: "long",
    23: "long",
    28: "long",
    32: "undefined",
    34: "undefined",
    37: "undefined",
    40: "undefined",
    42: "undefined",
  };
  let Aend1Markup: metaLine = { line: AeneidLn1, markup: {} };
  let Aeneid1Scan: quantity[][] = [
    [
      "long",
      "short",
      "short",
      "break",
      "long",
      "short",
      "short",
      "break",
      "long",
      "long",
      "break",
      "long",
      "long",
      "break",
      "long",
      "short",
      "short",
      "break",
      "long",
      "undefined",
    ],
  ];
  let AeneidMarked = "Ārmă vĭ|rūmquĕ că|nō Trō|iāe quī| prīmŭs ă|b ōris";
  let AeneidLn1Done: scannedLineType = {
    line: AeneidLn1,
    raws: [AeneidNatQuants].map((each) => {
      return postScan(Aend1Markup, each);
    }),
    full: [[AeneidMarked]],
  };

  test.todo("scan paragraph");

  test("scan line", () => {
    expect(scanLine(AeneidLn1, PresetOptions)).toEqual(AeneidLn1Done);
  });

  test("undress", () => {
    let input =
      "this: is; a, line? to be undressed! it has a bunch of punctuation.";
    let output: metaLine = {
      line: "this is a line to be undressed it has a bunch of punctuation",
      markup: { 4: ":", 8: ";", 11: ",", 17: "?", 34: "!", 65: "." },
    };
    expect(undress(input)).toEqual(output);
  });

  test("pre-scan", () => {
    //let input2 = "Italiam fato profugus Laviniaque venit";
    expect(preScan(AeneidLn1)).toEqual([AeneidNatQuants]);
  });

  test("post-scan", () => {
    let markings = marryUp(
      Aeneid1Scan[0],
      Object.keys(AeneidNatQuants).map((el) => {
        return parseInt(el);
      })
    );
    expect(postScan(Aend1Markup, markings)).toEqual(AeneidMarked);
  });

  test("hex scan", () => {
    expect(hexScan(AeneidNatQuants)).toEqual(Aeneid1Scan);
  });

  test("array to quantity", () => {
    let input = [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 1, 1, 0],
    ]; // three random test cases
    let output: quantity[][] = [
      [
        "long",
        "long",
        "break",
        "long",
        "long",
        "break",
        "long",
        "long",
        "break",
        "long",
        "long",
        "break",
        "long",
        "short",
        "short",
        "break",
        "long",
        "undefined",
      ],
      [
        "long",
        "short",
        "short",
        "break",
        "long",
        "short",
        "short",
        "break",
        "long",
        "short",
        "short",
        "break",
        "long",
        "short",
        "short",
        "break",
        "long",
        "short",
        "short",
        "break",
        "long",
        "undefined",
      ],
      [
        "long",
        "long",
        "break",
        "long",
        "short",
        "short",
        "break",
        "long",
        "short",
        "short",
        "break",
        "long",
        "long",
        "break",
        "long",
        "short",
        "short",
        "break",
        "long",
        "undefined",
      ],
    ];
    expect(arrToQuantity(input)).toEqual(output);
  });

  test("marry up", () => {
    let quantities: quantity[] = [
      "long",
      "short",
      "long",
      "short",
      "long",
      "long",
    ];
    let positions = [11, 32, 34, 40, 50, 51];
    let ans: sylMap = {
      11: "long",
      32: "short",
      34: "long",
      40: "short",
      50: "long",
      51: "long",
    };
    expect(marryUp(quantities, positions)).toEqual(ans);
  });

  test("insert punctuation", () => {
    let markup = { 4: ":", 8: ";", 11: ",", 17: "?", 34: "!", 65: "." };
    let line = Array.from(
      "this is a line to be undressed it has a bunch of punctuation"
    );
    let ans = Array.from(
      "this: is; a, line? to be undressed! it has a bunch of punctuation."
    );

    expect(insertPunctuation(line, markup)).toEqual(ans);
  });
});

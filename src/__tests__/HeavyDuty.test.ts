import {
  marryUp,
  postScan,
  preScan,
  scanLine,
  scanParagraph,
} from "../SCAN/scan";
import { PresetOptions } from "../SCAN/utils";

describe("testing the placement of line breaks", () => {
  let AeneidLn1 = "Arma virumque cano Troiae qui primus ab oris";
  let Aend1Markup: metaLine = { line: AeneidLn1, markup: { 18: "," } };

  test("testing placement of line breaks", () => {
    let output = "Ārmă vĭ|rūmquĕ că|nō, Trōi|āe quī| prīmŭs ăb| ōris";
    let markings = marryUp(
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
      Object.keys({
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
      }).map((el) => {
        return parseInt(el);
      })
    );
    //expect(postScan(Aend1Markup, markings)).toEqual(output);
  });

  test("using amores 1 ln 2", () => {
    expect(
      scanLine("par erat inferior versus—risisse Cupido.", "Hexameter")
        .output[0].full[0]
    ).toBe("pār ĕrăt| īnfĕrĭ|ōr vē|rsūs—rī|sīssĕ Cŭ|pīdo.");
  });

  test("handling of EU ", () => {
    let input = "hospitio Teucris ne fati nescia Dido";
    let ans = [
      {
        "1": "long",
        "10": "long",
        "14": "long",
        "18": "undefined",
        "21": "undefined",
        "23": "undefined",
        "26": "long",
        "29": "short",
        "30": "undefined",
        "33": "undefined",
        "35": "undefined",
        "4": "undefined",
        "6": "short",
        "7": "undefined",
      },
      {
        "1": "long",
        "10": "short",
        "11": "undefined",
        "14": "long",
        "18": "undefined",
        "21": "undefined",
        "23": "undefined",
        "26": "long",
        "29": "short",
        "30": "undefined",
        "33": "undefined",
        "35": "undefined",
        "4": "undefined",
        "6": "short",
        "7": "undefined",
      },
    ];
    expect(preScan(input)).toEqual(ans);
  });

  let met697 = "corneus huic arcus, si non foret aureus illi;";
});

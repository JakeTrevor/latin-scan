// import type {
//   quantity,
//   scannedLineType,
//   syllableMap,
// } from "src/SCAN/scanTypes";
// import { PresetOptions } from "../SCAN/utils";
// import {
//   scanParagraph,
//   scanLine,
//   removePunctuation,
//   preScan,
//   postScan,
//   analyseHex,
//   arrToQuantity,
//   marryUp,
//   insertPunctuation,
// } from "../SCAN/scan";

// describe("scan algorithm functionality testing", () => {
//   //test if each of the functions in scan.ts *works* in some case
//   //none of these are proper stress tests, which would look at edge cases.

//   //some vairbles used throughout the testing:
//   let AeneidLn1 = "Arma virumque cano Troiae qui primus ab oris";
//   let AeneidNatQuants: syllableMap = {
//     //short for Aeneidln1 natural quantities
//     0: "long",
//     3: "undefined",
//     6: "undefined",
//     8: "long",
//     12: "undefined",
//     15: "undefined",
//     17: "long",
//     21: "long",
//     23: "long",
//     28: "long",
//     32: "undefined",
//     34: "undefined",
//     37: "undefined",
//     40: "undefined",
//     42: "undefined",
//   };
//   let Aeneid1Scan: syllableMap = {
//     "0": "long",
//     "12": "short",
//     "15": "short",
//     "17": "long",
//     "21": "long",
//     "23": "long",
//     "28": "long",
//     "3": "short",
//     "32": "long",
//     "34": "short",
//     "37": "short",
//     "40": "long",
//     "42": "undefined",
//     "6": "short",
//     "8": "long",
//   };
//   let AeneidMarked = "Ārmă vĭ|rūmquĕ că|nō Trōi|āe quī| prīmŭs ăb| ōris";
//   let AeneidLn1Done: scannedLineType = {
//     line: AeneidLn1,
//     output: [
//       {
//         raw: "Ārma virūmque canō Trōiāe quī primus ab oris",
//         full: [AeneidMarked],
//       },
//     ],
//     errors: [],
//   };

//   test.todo("scan paragraph");

//   test("scan line", () => {
//     expect(scanLine(AeneidLn1, PresetOptions.meter)).toEqual(AeneidLn1Done);
//   });

//   test("undress", () => {
//     let input =
//       "this: is; a, line? to be undressed! it has a bunch of punctuation.";
//     let output = [
//       { 4: ":", 8: ";", 11: ",", 17: "?", 34: "!", 65: "." },
//       "this is a line to be undressed it has a bunch of punctuation",
//     ];
//     expect(removePunctuation(input)).toEqual(output);
//   });

//   test("pre-scan", () => {
//     //let input2 = "Italiam fato profugus Laviniaque venit";
//     expect(preScan(AeneidLn1)).toEqual([AeneidNatQuants]);
//   });

//   test("post-scan", () => {
//     let breaks = [7, 16, 22, 29, 38];
//     expect(postScan(AeneidLn1, {}, Aeneid1Scan, breaks)).toEqual(AeneidMarked);
//   });

//   test("hex scan", () => {
//     let output: [syllableMap, number[]][] = [];
//     output.push([Aeneid1Scan, [7, 16, 22, 29, 38]]);

//     expect(analyseHex(AeneidNatQuants)).toEqual([
//       [Aeneid1Scan, [7, 16, 22, 29, 38]],
//     ]);
//   });

//   test("array to quantity", () => {
//     let input = [
//       [0, 0, 0, 0],
//       [1, 1, 1, 1],
//       [0, 1, 1, 0],
//     ]; // three random test cases
//     let output: quantity[][] = [
//       [
//         "long",
//         "long",
//         "break",
//         "long",
//         "long",
//         "break",
//         "long",
//         "long",
//         "break",
//         "long",
//         "long",
//         "break",
//         "long",
//         "short",
//         "short",
//         "break",
//         "long",
//         "undefined",
//       ],
//       [
//         "long",
//         "short",
//         "short",
//         "break",
//         "long",
//         "short",
//         "short",
//         "break",
//         "long",
//         "short",
//         "short",
//         "break",
//         "long",
//         "short",
//         "short",
//         "break",
//         "long",
//         "short",
//         "short",
//         "break",
//         "long",
//         "undefined",
//       ],
//       [
//         "long",
//         "long",
//         "break",
//         "long",
//         "short",
//         "short",
//         "break",
//         "long",
//         "short",
//         "short",
//         "break",
//         "long",
//         "long",
//         "break",
//         "long",
//         "short",
//         "short",
//         "break",
//         "long",
//         "undefined",
//       ],
//     ];
//     expect(arrToQuantity(input, "Hexameter")).toEqual(output);
//   });

//   test("marry up", () => {
//     let quantities: quantity[] = [
//       "long",
//       "short",
//       "break",
//       "long",
//       "short",
//       "long",
//       "long",
//     ];
//     let positions = [11, 32, 34, 40, 50, 51];
//     let ans = [
//       {
//         11: "long",
//         32: "short",
//         34: "long",
//         40: "short",
//         50: "long",
//         51: "long",
//       },
//       [33],
//     ];
//     expect(marryUp(quantities, positions)).toEqual(ans);
//   });

//   test("insert punctuation", () => {
//     let markup = { 4: ":", 8: ";", 11: ",", 17: "?", 34: "!", 65: "." };
//     let line = Array.from(
//       "this is a line to be undressed it has a bunch of punctuation"
//     );
//     let ans = Array.from(
//       "this: is; a, line? to be undressed! it has a bunch of punctuation."
//     );

//     expect(insertPunctuation(line, markup)).toEqual(ans);
//   });
// });

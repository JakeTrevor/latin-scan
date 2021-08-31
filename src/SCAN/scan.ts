//scan.ts
import type {
  meter,
  quantity,
  rawType,
  scannedLineType,
  setting,
} from "./scanTypes";
import { removePunctuation } from "./punctuationFunctions";
import { analyseHex, analysePen } from "./lineAnalysisFunctions";
import { preScan, postScan } from "./commonFunctions";

//*main functions
export let scanParagraph = (
  text: string,
  settings: setting
): scannedLineType[] => {
  let lines = text.split("\n");
  let finishedLines: scannedLineType[] = [];

  if (settings.meter === "Elegaic") {
    let currentMeter = settings.firstMeter;

    for (let line of lines) {
      if (line !== "") {
        finishedLines.push(scanLine(line, currentMeter));
        currentMeter = switchElegaicMeter(currentMeter);
      }
    }
  } else {
    for (let line of lines) {
      if (line !== "") {
        finishedLines.push(scanLine(line, settings.meter));
      }
    }
  }

  return finishedLines;
};

export let scanLine = (line: string, meter: meter): scannedLineType => {
  let output: scannedLineType = {
    status: "warn",
    statusMessage: "This line cannot be scanned",
    meter: meter,
    line: line,
    output: [],
  };

  //start by stripping the line of punctuation and performin a first pass
  let [punctuation, strippedLine] = removePunctuation(line);
  let firstPass = preScan(strippedLine);

  //now we need to match the possible scans to the first passes
  switch (meter) {
    case "Hexameter":
      for (let each of firstPass) {
        //iterate over each quantity possibility
        let temp: rawType = { raw: "", full: [], errors: [] };
        try {
          let secondPasses = analyseHex(each);
          temp.raw = postScan(strippedLine, punctuation, each, []); //post process the line
          temp.full = secondPasses.map((each) => {
            let [sylables, breaks] = each;
            return postScan(strippedLine, punctuation, sylables, breaks);
          });
        } catch (error: any) {
          temp = {
            raw: postScan(strippedLine, punctuation, each, []),
            full: [],
            errors: [error],
          };
        }
        output.output.push(temp);
      }
      break;

    case "Pentameter":
      for (let each of firstPass) {
        //iterate over each quantity possibility
        let temp: rawType = { raw: "", full: [], errors: [] };
        try {
          let secondPasses = analysePen(each);
          temp.raw = postScan(strippedLine, punctuation, each, []); //post process the line
          temp.full = secondPasses.map((each) => {
            let [sylables, breaks] = each;
            return postScan(strippedLine, punctuation, sylables, breaks);
          });
        } catch (error: any) {
          temp = {
            raw: postScan(strippedLine, punctuation, each, []),
            full: [],
            errors: [error],
          };
        }
        output.output.push(temp);
      }
      break;
  }
  return output;
};

function switchElegaicMeter(meter: meter): meter {
  return meter === "Hexameter" ? "Pentameter" : "Hexameter";
}

//TODO needs cleaning
export function arrToQuantity(arr: number[][], meter: meter): quantity[][] {
  let output: quantity[][] = [];
  let temp: quantity[][];
  for (let each of arr) {
    temp = each.map((el) => {
      //first we map each 0 or 1 to an array of quantities.
      return el === 0 //if the element is 0, then the foot is long
        ? ["long", "long", "break"] //so insert the long foot template
        : ["long", "short", "short", "break"]; //else, insert the short foot template
    });

    //we have now an array of quantity arrays; (quantity[][])
    switch (meter) {
      case "Hexameter":
        temp.push(["long", "short", "short", "break", "long", "undefined"]);
        break;
      case "Pentameter":
        temp.push([
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
        ]);
        break;
    }

    //we then flatten this by concatenating all the inner lists
    //resulting in a quant[]
    let temp2 = temp.reduce((acc, val) => {
      return acc.concat(val);
    });

    output.push(temp2); //push this to the list of meters
  }
  return output;
}

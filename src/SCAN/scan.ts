//scan.ts
import type {
  meter,
  quantity,
  rawType,
  scannedLineType,
  setting,
  syllableMap,
} from "./scanTypes";
import { removePunctuation } from "./punctuationFunctions";
import ANALYSIS_FUNCTIONS from "./lineAnalysisFunctions";
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
  let numberOfSolutions = 0;
  let output: scannedLineType = {
    status: "Warning",
    statusMessage: "This line cannot be scanned in " + meter,
    meter: meter,
    line: line,
    output: [],
  };
  //start by stripping the line of punctuation and performin a first pass
  let [punctuation, strippedLine] = removePunctuation(line);
  let firstPass = preScan(strippedLine);

  for (let each of firstPass) {
    let temp: rawType = { raw: "", full: [], errors: [] };

    try {
      let secondPasses = ANALYSIS_FUNCTIONS[meter](each);
      temp.raw = postScan(strippedLine, punctuation, each, []); //post process the line
      temp.full = secondPasses.map((each) => {
        ++numberOfSolutions;
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
  if (numberOfSolutions === 1) {
    output.status = meter + "OK";
    output.statusMessage = "This line has been scanned in " + meter;
  } else if (numberOfSolutions > 1) {
    output.status = meter + "+";
    output.statusMessage = "This line has multiple scans in " + meter;
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

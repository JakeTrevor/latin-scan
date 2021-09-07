import type { syllableMap, quantity } from "../projectTypes";
import { arrToQuantity } from "./scan";
import { sum } from "./utils";
// the issue is that throwing the error does not allow me to return a value.
//and i may wish to pass back both a completed scan and an error message
//so, a rewrite it is! (ugh)

//todo reveiw necesity of this function.
function generateHexCombos(dactyls: number): number[][] {
  let combos = [];
  let temp = [0, 0, 0, 0];

  if (dactyls === 0) {
    combos.push(Array.from(temp));
  }
  while (sum(temp) < 4) {
    temp[0]++;

    for (let count = 0; count < 3; count++) {
      if (temp[count] > 1) {
        temp[count] = 0;
        temp[count + 1]++;
      }
    }

    if (sum(temp) === dactyls) {
      combos.push(Array.from(temp));
    }
  }
  return combos;
}

interface analysedLine {
  line: [syllableMap, number[]][];
  error: string;
}

export function analyseHex(map: syllableMap): analysedLine {
  let returnedObject: analysedLine = { line: [], error: "" };
  let positions = Object.keys(map).map((each) => {
    return parseInt(each);
  });

  let knownQuantValues = Object.values(map);
  let meters: quantity[][] = [];

  //now, calculate the number of spondaic syllables
  let vowels = knownQuantValues.length;
  let dactyls = vowels - 13;

  //handle line too long or short cases
  if (dactyls > 4) {
    returnedObject.error = "This line has too many vowels";
    return returnedObject;
  } else if (dactyls < 0) {
    returnedObject.error = "This line has too few vowels";
    return returnedObject;
  }

  meters = arrToQuantity(generateHexCombos(dactyls), "Hexameter");

  //create a copy of the meters without breaks
  let clone = meters.map((each) => {
    return each.filter((elt) => {
      return elt !== "break";
    });
  });

  //compare each possible scan to the array of known quantities.
  let curQuant: quantity;
  for (let vowelCounter = 0; vowelCounter < vowels - 5; vowelCounter++) {
    curQuant = knownQuantValues[vowelCounter];
    if (curQuant !== "undefined") {
      for (let meterCounter = 0; meterCounter < meters.length; meterCounter++) {
        if (clone[meterCounter][vowelCounter] === "undefined") {
          // do nothing.
        } else if (clone[meterCounter][vowelCounter] !== curQuant) {
          clone.splice(meterCounter, 1);
          meters.splice(meterCounter, 1);
          meterCounter--;
        }
      }
    }
  }

  //if the quantity of the last vowel is known, add it.
  for (let each of meters) {
    each[each.length - 1] = knownQuantValues[knownQuantValues.length - 1];
  }

  //convert quantity arrays to records mapping position to quantity
  returnedObject.line = meters.map((each) => {
    return marryUp(each, positions);
  });

  //check for bad patterns
  if (returnedObject.error) {
    //do nothing
  } else if (checkForLongShortLong(knownQuantValues)) {
    returnedObject.error = "A long short long pattern is in this line.";
  } else if (meters.length === 0) {
    returnedObject.error = "We have found no valid scans for this vowel set";
  }
  return returnedObject;
}

export function analysePen(map: syllableMap): analysedLine {
  function generatePenCombos(dactyls: number): number[][] {
    switch (dactyls) {
      case 0:
        return [[0, 0]];
      case 1:
        return [
          [0, 1],
          [1, 0],
        ];
      case 2:
        return [[1, 1]];
    }
    return [[0, 0]]; //the default case is to assume 0 dactyls
  }

  let returnedObject: analysedLine = { line: [], error: "" };
  let positions = Object.keys(map).map((each) => {
    return parseInt(each);
  }); //extract the posiions; this is used near the end

  let knownQuantValues = Object.values(map); //extract quantities array
  let meters: quantity[][] = [];

  //now, calculate the number of spondaic syllables
  let vowels = knownQuantValues.length;
  let dactyls = vowels - 12;

  //handle line too long or short cases
  if (dactyls > 2) {
    returnedObject.error = "This line has too many vowels";
    return returnedObject;
  } else if (dactyls < 0) {
    returnedObject.error = "This line has too few vowels";
    return returnedObject;
  }

  meters = arrToQuantity(generatePenCombos(dactyls), "Pentameter");

  //create a copy of the meters without breaks
  let clone = meters.map((each) => {
    return each.filter((elt) => {
      return elt !== "break";
    });
  });

  //compare each possible scan to the array of known quantities.
  let curQuant: quantity;
  for (let vowelCounter = 0; vowelCounter < vowels; vowelCounter++) {
    curQuant = knownQuantValues[vowelCounter];
    if (curQuant !== "undefined") {
      for (let meterCounter = 0; meterCounter < meters.length; meterCounter++) {
        if (clone[meterCounter][vowelCounter] === "undefined") {
          // do nothing.
        } else if (clone[meterCounter][vowelCounter] !== curQuant) {
          clone.splice(meterCounter, 1);
          meters.splice(meterCounter, 1);
          meterCounter--;
        }
      }
    }
  }

  //convert quantity arrays to records mapping position to quantity
  returnedObject.line = meters.map((each) => {
    return marryUp(each, positions);
  });

  //check for bad patterns
  if (returnedObject.error) {
    //do nothing
  } else if (checkForLongShortLong(knownQuantValues)) {
    returnedObject.error = "A long short long pattern is in this line.";
  } else if (meters.length === 0) {
    returnedObject.error = "We have found no valid scans for this vowel set";
  }
  return returnedObject;
}

function marryUp(
  quants: quantity[],
  positions: number[]
): [syllableMap, number[]] {
  let quantMap: syllableMap = {};
  let breaks: number[] = [];

  for (let i = 0; i < quants.length; i++) {
    let curQuant = quants[i];
    let curPos: number;
    if (curQuant === "break") {
      breaks.push(positions[i - breaks.length - 1] + 1);
    } else {
      curPos = positions[i - breaks.length];
      quantMap[curPos] = curQuant;
    }
  }
  return [quantMap, breaks];
}

const ANALYSIS_FUNCTIONS = {
  Hexameter: analyseHex,
  Pentameter: analysePen,
  Elegaic: analyseHex, //bit of a bodge to get the types working. whagamabagado?
};

export default ANALYSIS_FUNCTIONS;

function checkForLongShortLong(line: quantity[]): boolean {
  const TARGET = ["long", "short", "long"];
  for (let i = 0; i < line.length - 3; i++) {
    let subsection = line.slice(i, i + 3);
    if (subsection.every((element, i) => element === TARGET[i])) {
      return true;
    }
  }
  return false;
}

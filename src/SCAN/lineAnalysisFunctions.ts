import type { syllableMap, quantity } from "./scanTypes";
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

export let analyseHex = (map: syllableMap): [syllableMap, number[]][] => {
  let positions = Object.keys(map).map((each) => {
    return parseInt(each);
  });

  let quantValues = Object.values(map);
  let meters: quantity[][] = [];

  //now, calculate the number of spondaic syllables
  let vowels = quantValues.length;
  let dactyls = vowels - 13;

  //handle line too long or short cases
  if (dactyls > 4) {
    throw "Too long!";
  } else if (dactyls < 0) {
    throw "Too short!";
  }

  meters = arrToQuantity(generateHexCombos(dactyls), "Hexameter");
  //create a copy of the meters without breaks
  let clone = meters.map((each) => {
    return each.filter((elt) => {
      return elt !== "break";
    });
  });
  let curQuant: quantity;
  for (let vowelCounter = 0; vowelCounter < vowels - 5; vowelCounter++) {
    curQuant = quantValues[vowelCounter];
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
  for (let each of meters) {
    each[each.length - 1] = quantValues[quantValues.length - 1];
  }

  return meters.map((each) => {
    return marryUp(each, positions);
  });
};

export let analysePen = (map: syllableMap): [syllableMap, number[]][] => {
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
  let positions = Object.keys(map).map((each) => {
    return parseInt(each);
  }); //extract the posiions; this is used near the end

  let quantValues = Object.values(map); //extract quantities array
  let meters: quantity[][] = [];

  //now, calculate the number of spondaic syllables
  let vowels = quantValues.length;
  let dactyls = vowels - 12;

  //handle line too long or short cases
  if (dactyls > 2) {
    throw "too long!";
  } else if (dactyls < 0) {
    throw "too short!";
  }

  meters = arrToQuantity(generatePenCombos(dactyls), "Pentameter");
  //create a copy of the meters without breaks
  let clone = meters.map((each) => {
    return each.filter((elt) => {
      return elt !== "break";
    });
  });
  let curQuant: quantity;

  for (let vowelCounter = 0; vowelCounter < vowels; vowelCounter++) {
    curQuant = quantValues[vowelCounter];
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

  return meters.map((each) => {
    return marryUp(each, positions);
  });
};

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

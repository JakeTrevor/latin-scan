//scan.ts
import type {
  meter,
  quantity,
  rawType,
  scannedLineType,
  setting,
  syllableMap,
  vowel,
} from "./scanTypes";
import expressions, {
  find,
  getLetter,
  mapFind,
  nBitCombos,
  sum,
} from "./utils";

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
  //start by strippin the line of punctuation and performin a first pass
  let [punctuation, strippedLine] = undress(line);
  let firstPasses = preScan(strippedLine);
  let output: scannedLineType = { line: line, output: [], errors: [] };

  //now we need to match the possible scans to the first passes
  switch (meter) {
    case "Hexameter":
      for (let each of firstPasses) {
        //iterate over each quantity possibility
        let temp: rawType = { raw: "", full: [] };
        try {
          let secondPasses = hexScan(each);
          temp.raw = postScan(strippedLine, punctuation, each, []); //post process the line
          temp.full = secondPasses.map((each) => {
            let [sylables, breaks] = each;
            return postScan(strippedLine, punctuation, sylables, breaks);
          });
        } catch (error) {
          temp = {
            raw: postScan(strippedLine, punctuation, each, []),
            full: [],
            errors: error,
          };
        }
        output.output.push(temp);
      }
      break;

    case "Pentameter":
      for (let each of firstPasses) {
        //iterate over each quantity possibility
        let temp: rawType = { raw: "", full: [] };
        try {
          let secondPasses = penScan(each);
          temp.raw = postScan(strippedLine, punctuation, each, []); //post process the line
          temp.full = secondPasses.map((each) => {
            let [sylables, breaks] = each;
            return postScan(strippedLine, punctuation, sylables, breaks);
          });
        } catch (error) {
          temp = {
            raw: postScan(strippedLine, punctuation, each, []),
            full: [],
            errors: error,
          };
        }
        output.output.push(temp);
      }
      break;
  }
  return output;
};

export let undress = (line: string): [Record<number, string>, string] => {
  let markup = mapFind(line, expressions["punc"]);
  line = line.replace(expressions["punc"], "");
  return [markup, line];
};

export let preScan = (line: string): syllableMap[] => {
  let quants: syllableMap = {};
  line = line.toLowerCase();

  let forcedSpondees = find(line, expressions.spondeeVowels);
  let forcedDactyls = find(line, expressions.dactylVowels);

  line = line.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); //pull out all the forced vowels and normalise the string.

  //start by removing fake vowels from the text; replaced with @; this never otherwise appears
  line = line.replace(expressions["silent1"], " @y");
  line = line.replace(expressions["silent2"], "q@");

  let positions = find(line, expressions["vowels"]); //a list of vowel positions

  //all the things to be removed
  let elide1 = find(line, expressions["ellisionFirstChar"]); //ellisions on the first word
  let elide2 = find(line, expressions["ellisionLastChar"]); //elisions on the second word
  elide2 = elide2.map((x) => positions[positions.indexOf(x) + 1]); //this line changes the pos. so they refer to the first letter of the second word.

  //now we look for known quantity.
  let longByPos = find(line, expressions["twoCons"]);
  let diphs = find(line, expressions["diphthongs"]);
  let diphs2 = diphs.map((x) => x + 1); //the second vowel of a dipthong, to be removed
  let maybeDiphs = find(line, expressions["maybeDiphthong"]); //look for "eu" formations. these are weird and are handled later.
  let adjacents = find(line, expressions["doubleVowel"]);
  adjacents = adjacents.filter(
    (pos) => !(diphs.includes(pos) || maybeDiphs.includes(pos))
  ); //find cases of vowel adjacency where no diphthong is formed.

  //clean up into three variables:
  let spondees: number[] = [];
  spondees = spondees.concat(longByPos);
  spondees = spondees.concat(diphs);

  let dactyls: number[] = [];
  dactyls = dactyls.concat(adjacents);

  let fakes: number[] = [];
  fakes = fakes.concat(diphs2);
  fakes = fakes.concat(elide1);
  fakes = fakes.concat(elide2);

  positions = positions.filter((x) => !fakes.includes(x));
  spondees = spondees.filter((x) => !fakes.includes(x));
  dactyls = dactyls.filter((x) => !fakes.includes(x));

  //now we add in the forced quantities
  //dactyls first
  positions = positions.concat(forcedDactyls);
  spondees = spondees.filter((x) => !forcedDactyls.includes(x));
  dactyls = dactyls.concat(forcedDactyls);

  //and now spondees
  positions = positions.concat(forcedSpondees);
  dactyls = dactyls.filter((x) => !forcedSpondees.includes(x));
  spondees = spondees.concat(forcedSpondees);

  //remove duplicates
  positions = positions.filter((item, pos) => {
    return positions.indexOf(item) === pos;
  });
  dactyls = dactyls.filter((item, pos) => {
    return dactyls.indexOf(item) === pos;
  });
  spondees = spondees.filter((item, pos) => {
    return spondees.indexOf(item) === pos;
  });

  //setup the quants dict. mapping position to a default value of 0
  for (let position of positions) {
    quants[position] = "undefined";
  }

  //write in the spondees and dactyls
  for (let each of spondees) {
    quants[each] = "long";
  }
  for (let each of dactyls) {
    quants[each] = "short";
  }

  //now to handle the maybe Dipthongs
  let outputArr: syllableMap[];
  if (maybeDiphs.length !== 0) {
    //there is an instance of "eu"
    let combos = nBitCombos(maybeDiphs.length);
    outputArr = [];
    for (let i = 0; i < combos.length; i++) {
      for (let j = 0; j < maybeDiphs.length; j++) {
        delete quants[maybeDiphs[j]];
        delete quants[maybeDiphs[j] + 1];
        if (combos[i][j] == "0") {
          quants[maybeDiphs[j]] = "long";
        } else {
          quants[maybeDiphs[j]] = "short";
          quants[maybeDiphs[j] + 1] = "undefined";
        }
      }
      outputArr.push(JSON.parse(JSON.stringify(quants))); //references are the bain of my life
    }
  } else {
    outputArr = [quants];
  }
  //i feel so gross....
  return outputArr;
};

export let postScan = (
  lineString: string,
  punctuation: Record<number, string>,
  markings: syllableMap,
  breaks: number[]
): string => {
  let line: string[] = Array.from(lineString); //we want to use array.splice to inset our characters, so we need our string to be an array
  let afterBreaks: number[] = [];

  let flag = false;
  let positions = Object.keys(markings).map((el) => {
    //positions currently holds the positions of valid vowels.
    let temp = parseInt(el);

    //this if statement generates an index we can use to look at the section of text a break is in
    //this helps place the break in an intuitive way
    if (flag) {
      afterBreaks.push(temp);
      flag = false;
    } else if (breaks?.includes(temp + 1)) {
      flag = true;
    }

    return temp;
  });

  //insert acented letters
  for (let each of positions) {
    line.splice(each, 1, getLetter(markings[each], line[each] as vowel));
  }

  //add the punctuation back in
  //get a list of positions with punctuation
  line = insertPunctuation(line, punctuation); //this inserts the punctuation into the line
  positions = Object.keys(punctuation).map((el) => {
    //positions now holds the positions of punctuation marks
    return parseInt(el);
  });

  //?this section handles the foot breaks.
  if (breaks) {
    //start by figuring out where in the line the break should go
    //i.e. after a dipthong, in a space, before punctuation

    //start by iterating over the breaks
    for (let i = 0; i < breaks.length; i++) {
      let subsection = lineString.substring(breaks[i], afterBreaks[i]) || "@"; //get the section of text the break will be inserted into
      ///You need the @ because if subsection defaults to "", then subsection[0] is undefined
      //and the regex match for /[aeiouy]/ returns true for some unfathomable reason
      if (/\s/.test(subsection)) {
        //if subsection contains a space
        breaks[i] += subsection.search(/\s/); //place the break before the space

        //
      } else if (/[aeiouy]/.test(subsection[0])) {
        //if the vowel is followed by annother unmarked vowel (i.e. it forms a diphthong)
        breaks[i] += 1; //place the break after the vowel.
      } //note that a space takes precedent over a dipthong.
    }

    //adjust the position of each break to account for the previous breaks
    for (let i = 0; i < breaks.length; i++) {
      breaks[i] += i;
    }

    //now correct for punctuation
    for (let i = 0; i < breaks.length; i++) {
      for (let each of positions) {
        if (each < breaks[i]) {
          breaks[i] += 1;
        }
      }
    }

    //insert
    for (let each of breaks) {
      line.splice(each, 0, "|");
    }
  }

  return line.join("");
};

function switchElegaicMeter(meter: meter): meter {
  return meter === "Hexameter" ? "Pentameter" : "Hexameter";
}

/** function that takes a list of permutator outputs (4 binary arrays) and returns a list of complete quantity descriptions; 1 for each arr in the input.
 *
 * @param { number[][] } arr
 * @returns { quantity[][] }
 */
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

/** utility function that marries up a list of quantities with a list of positions into a record/dictionary
 *
 * @param { quantity[] } quants
 * @param { number [] } positions
 * @returns { syllableMap }
 */
export function marryUp(
  quants: quantity[],
  positions: number[]
): [syllableMap, number[]] {
  //defining structrures to be returned
  let output: syllableMap = {};
  let breaks: number[] = [];

  //looping over all quantities/positions
  for (let i = 0; i < quants.length; i++) {
    let curQuant = quants[i];
    let curPos: number;
    if (curQuant === "break") {
      breaks.push(positions[i - breaks.length - 1] + 1);
    } else {
      curPos = positions[i - breaks.length];
      output[curPos] = curQuant;
    }
  }
  return [output, breaks];
}

export let insertPunctuation = (
  line: string[],
  markup: Record<number, string>
): string[] => {
  let positions = Object.keys(markup).map((el) => parseInt(el));
  for (let each of positions) {
    line.splice(each, 0, markup[each]);
  }
  return line;
};

/**
 * hexScan matches the possible scans to the known quantities
 * returns an array of objects
 * each object containing
 * @param {Object} quants
 */
export let hexScan = (map: syllableMap): [syllableMap, number[]][] => {
  /**
   * you tell it how many spondees there are
   * and it generates all the possible combinations for that line
   * @param {Integer} spondees
   */
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
  let positions = Object.keys(map).map((each) => {
    return parseInt(each);
  }); //extract the posiions; this is used near the end

  let quantValues = Object.values(map); //extract quantities array
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

export let penScan = (map: syllableMap): [syllableMap, number[]][] => {
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
  // if (dactyls > 2) {
  //   console.log("too long!");
  // } else if (dactyls < 0) {
  //   console.log("too short!");
  // }

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

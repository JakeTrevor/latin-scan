//scan.ts
import type {
  metaLine,
  quantity,
  scannedLineType,
  setting,
  sylMap,
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
/**
 * The wrapper function is the interface for scanning lines with the scan algorithm
 * returns a list of lists; each sublist contains the origional line and the possible scans for that line
 * wrapper takes two arguments:
 * @param {string} text - a list of lines to be scanned
 * @param {settings} settings - special object that details the specifics of the scan
 * @returns {scannedLineType}
 */
export let ScanParagraph = (text: string, settings: setting) => {
  let lines = text.split("\n");
  let done: scannedLineType[] = [];
  for (let line of lines) {
    done.push(scanLine(line, settings));
  }
  return done;
};

export let scanLine = (line: string, settings: setting): scannedLineType => {
  let output: scannedLineType = { line: line, raws: [], full: [] }; //initialize output object

  let meta: metaLine = undress(line);
  let raws = preScan(meta.line);
  let dressedRaws: string[] = [];
  for (let each of raws) {
    dressedRaws.push(postScan(meta, each));
  }
  output.raws = dressedRaws;

  //  now we would switch on settings.meter
  let toDress: sylMap[][] = [];
  switch (settings.meter) {
    case "hex":
      for (let each of raws) {
        let quantityScans = hexScan(each);
        let pos = Object.keys(each).map((elt) => {
          return parseInt(elt);
        });
        let scans = quantityScans.map((elt) => {
          return marryUp(elt, pos);
        });
        toDress.push(scans);
      }
  }

  let done: string[][] = toDress.map((rawGroup) => {
    return rawGroup.map((raw) => {
      return postScan(meta, raw);
    });
  });
  output.full = done;
  return output;
};

/** undresses (removes punctuation from) a string
 *
 * @param {string} line
 * @returns {metaLine}
 */
export let undress = (line: string): metaLine => {
  let markup = mapFind(line, expressions["punc"]);
  line = line.replace(expressions["punc"], "");
  return { line: line, markup: markup };
};

/**
 * prescan takes a single line as input
 * it does the work common to all scan implementations, such as finding the vowels,
 * assining preliminary quantity, etc.
 * returns an object mapping position of a vowel to its quantity.
 * @param {string} line - the line being preped.
 * @returns {sylMap[]}
 */
export let preScan = (line: string): sylMap[] => {
  let quants: sylMap = {};
  line = line.toLowerCase();

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

  let outputArr: sylMap[];
  if (maybeDiphs.length !== 0) {
    //there is an instance of "eu"
    let combos = nBitCombos(maybeDiphs.length);
    outputArr = Array(combos.length).fill(quants);
    for (let i = 0; i < combos.length; i++) {
      for (let j = 0; j < maybeDiphs.length; j++) {
        if (combos[i][j] === "0") {
          outputArr[i][maybeDiphs[j]] = "long";
        } else {
          outputArr[i][maybeDiphs[j]] = "short";
          outputArr[i][maybeDiphs[j] + 1] = "undefined";
        }
      }
    }
  } else {
    outputArr = [quants];
  }
  //i feel so gross....

  return outputArr;
};

export let postScan = (meta: metaLine, markings: sylMap): string => {
  let line: string[] = Array.from(meta.line); //we want to use array.splice to inset our characters, so we need our string to be an array
  let punctuation = meta.markup;
  let breaks: number[] = [];
  let positions = Object.keys(markings).map((el) => {
    //positions currently holds the positions of valid vowels.
    return parseInt(el);
  });
  for (let each of positions) {
    if (markings[each] === "break") {
      breaks.push(each);
    } else {
      line.splice(each, 1, getLetter(markings[each], line[each] as vowel));
    }
  }
  //at this point, the string has foot markings, but no punctuation.
  //time to add punctuation back...
  positions = Object.keys(punctuation).map((el) => {
    //positions now holds the positions of punctuation marks
    return parseInt(el);
  });
  let pointer = 0;
  for (let each of positions) {
    if (pointer === breaks.length) {
      break;
    } else if (breaks[pointer] > each) {
      pointer++;
    }
    for (let i = pointer; i < breaks.length; i++) {
      breaks[i]++;
    }
  }

  for (let i = 0; i < breaks.length; i++) {
    breaks[i] += i;
    if (breaks[i] in punctuation) {
      breaks[i]++;
    }
  }

  line = insertPunctuation(line, punctuation); //this inserts the punctuation into the line
  for (let each of breaks) {
    line.splice(each, 0, "|");
  }
  return line.join("");
};

/**
 * hexScan matches the possible scans to the known quantities
 * returns an array of objects
 * each object containing
 * @param {Object} quants
 */
export let hexScan = (map: sylMap): quantity[][] => {
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
  //positions do not matter to the analyser, so we
  let quantValues = Object.values(map); //extract quantities array
  let meters: quantity[][] = [];

  //now, calculate the number of spondaic syllables
  let vowels = quantValues.length;
  let dactyls = vowels - 13;

  //handle line too long or short cases
  if (dactyls > 4) {
    console.log("too long!");
    return meters;
  } else if (dactyls < 0) {
    console.log("too short!");
    return meters;
  }

  meters = arrToQuantity(generateHexCombos(dactyls));
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

  return meters;
};

/** function that takes a list of permutator outputs (4 binary arrays) and returns a list of complete quantity descriptions; 1 for each arr in the input.
 *
 * @param { number[][] } arr
 * @returns { quantity[][] }
 */
export function arrToQuantity(arr: number[][]): quantity[][] {
  let output: quantity[][] = [];
  for (let each of arr) {
    let temp = each.map((el) => {
      //first we map each 0 or 1 to an array of quantities.
      return el === 0 //if the element is 0, then the foot is long
        ? (["long", "long", "break"] as quantity[]) //so insert the long foot template
        : (["long", "short", "short", "break"] as quantity[]); //else, insert the short foot template
    });

    //we have now an array of quantity arrays; (quantity[][])
    temp.push([
      "long",
      "short",
      "short",
      "break",
      "long",
      "undefined",
    ] as quantity[]);

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
 * @returns { sylMap }
 */
export function marryUp(quants: quantity[], positions: number[]): sylMap {
  let output: sylMap = {};
  let breaks = 0;
  for (let i = 0; i < quants.length; i++) {
    let curQuant = quants[i];
    let curPos: number;
    if (curQuant === "break") {
      breaks++;
      curPos = positions[i - breaks] + 1;
    } else {
      curPos = positions[i - breaks];
    }
    output[curPos] = curQuant;
  }
  return output;
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

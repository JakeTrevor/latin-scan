import type { syllableMap, vowel } from "./scanTypes";
import expressions, {
  findAllMatches,
  getLetterWithMarking,
  nBitCombos,
} from "./utils";
import { insertPunctuation } from "./punctuationFunctions";

export let preScan = (line: string): syllableMap[] => {
  let quants: syllableMap = {};
  line = line.toLowerCase();
  let forcedSpondees = findAllMatches(line, expressions.spondeeVowels);
  let forcedDactyls = findAllMatches(line, expressions.dactylVowels);

  line = line.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); //pull out all the forced vowels and normalise the string.

  //start by removing fake vowels from the text; replaced with @; this never otherwise appears
  line = line.replace(expressions["silent1"], " @y");
  line = line.replace(expressions["silent2"], "q@");

  let positions = findAllMatches(line, expressions["vowels"]); //a list of vowel positions

  //all the things to be removed
  let elide1 = findAllMatches(line, expressions["ellisionOnFirstChar"]); //ellisions on the first word
  let elide2 = findAllMatches(line, expressions["ellisionOnLastChar"]); //elisions on the second word
  elide2 = elide2.map((x) => positions[positions.indexOf(x) + 1]); //this line changes the pos. so they refer to the first letter of the second word.

  //now we look for known quantity.
  let longByPos = findAllMatches(line, expressions["twoConsonants"]);
  let diphs = findAllMatches(line, expressions["diphthongs"]);
  let diphs2 = diphs.map((x) => x + 1); //the second vowel of a dipthong, to be removed
  let maybeDiphs = findAllMatches(line, expressions["maybeDiphthong"]); //look for "eu" formations. these are weird and are handled later.
  let adjacents = findAllMatches(line, expressions["doubleVowel"]);
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
      outputArr.push({ ...quants }); //deepcopy
    }
  } else {
    outputArr = [quants];
  }
  return outputArr;
};

export let postScan = (
  lineString: string,
  punctuation: Record<number, string>,
  markings: syllableMap,
  breaks: number[]
): string => {
  let line: string[] = Array.from(lineString);
  let vowelPositions = Object.keys(markings).map((el) => parseInt(el));

  //insert acented letters
  for (let each of vowelPositions) {
    line.splice(
      each,
      1,
      getLetterWithMarking(markings[each], line[each] as vowel)
    );
  }

  //add the punctuation back in
  line = insertPunctuation(line, punctuation);

  line = insertBreaks(breaks, vowelPositions, punctuation, line);
  return line.join("");
};

export function insertBreaks(
  breaks: number[],
  vowelPositions: number[],
  punctuation: Record<number, string>,
  line: string[]
) {
  if (breaks) {
    let nextVowelAfterBreak = getVowelsAfterBreaks(vowelPositions, breaks);
    adjustBreakPositionsForSpacesAndDiphthongs(nextVowelAfterBreak);

    for (let i = 0; i < breaks.length; i++) {
      breaks[i] += i;
    }

    //correct for punctuation
    let punctuationPositions = Object.keys(punctuation).map((el) => {
      return parseInt(el);
    });
    for (let i = 0; i < breaks.length; i++) {
      for (let each of punctuationPositions) {
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
  return line;

  function adjustBreakPositionsForSpacesAndDiphthongs(
    nextVowelAfterBreak: number[]
  ) {
    let lineString = line.join("");
    for (let i = 0; i < breaks.length; i++) {
      let subsection =
        lineString.substring(breaks[i], nextVowelAfterBreak[i]) || "@"; //! "@" is needed to prevent "" default, which causes an error
      if (/\s/.test(subsection)) {
        breaks[i] += subsection.search(/\s/);
      } else if (/[aeiouy]/.test(subsection[0])) {
        breaks[i] += 1;
      }
    }
  }

  function getVowelsAfterBreaks(vowelPositions: number[], breaks: number[]) {
    let vowelsFollowingBreak: number[] = [];
    let nextVowelIsAfterBreak = false;
    for (let each of vowelPositions) {
      if (nextVowelIsAfterBreak) {
        vowelsFollowingBreak.push(each);
        nextVowelIsAfterBreak = false;
      }
      if (breaks.includes(each + 1)) {
        nextVowelIsAfterBreak = true;
      }
    }
    return vowelsFollowingBreak;
  }
}
